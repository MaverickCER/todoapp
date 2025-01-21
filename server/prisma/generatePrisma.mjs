import fs from 'fs';
import path from 'path';

// Directory paths
const modelsDir = path.resolve('./server/src/libs/prisma/models');
const templatesDir = path.resolve('./server/src/libs/prisma/templates');
const outputPrismaFile = path.resolve('./server/prisma/schema.prisma');
const outputIndexFile = path.resolve('./server/src/libs/prisma/index.ts');

// Function to read and replace file paths in comments
function replaceCommentWithFileContent(fileContent, baseDir) {
  // Regular expression to find comments with relative file paths (e.g., // ../templates/ipAddress.template.prisma)
  const regex = /\/\/\s*\.{2}\/([\w/.]+\.prisma)/g;

  // Replace the comment with the content of the referenced file
  return fileContent.replace(regex, (match, relativePath) => {
    const absolutePath = path.resolve(baseDir, relativePath);

    // If the referenced file exists, read and return its content
    if (fs.existsSync(absolutePath)) {
      return fs.readFileSync(absolutePath, 'utf8');
    }

    // If the file does not exist, return the original comment
    return match;
  });
}

// Read all .prisma files from the models directory
function getModelFiles() {
  const modelFiles = fs.readdirSync(modelsDir).filter((file) => file.endsWith('.prisma'));
  return modelFiles.map((file) => path.resolve(modelsDir, file));
}

// Function to generate the final schema.prisma file
async function generatePrismaSchema() {
  const modelFiles = getModelFiles();

  // Start writing to the output Prisma schema file
  let finalContent = ``;
  finalContent += `// ------------------------------------------------------\n`;
  finalContent += `// IMPORTANT! NEVER EDIT THIS FILE DIRECTLY\n`;
  finalContent += `// Please update src/libs/prisma/models and npm run prisma\n`;
  finalContent += `// ------------------------------------------------------\n\n`;
  finalContent += `generator client {\n`;
  finalContent += `  provider = "prisma-client-js"\n`;
  finalContent += `}\n\n`;
  finalContent += `datasource db {\n`;
  finalContent += `  provider = "mysql"\n`;
  finalContent += `  url      = env("DATABASE_URL")\n`;
  finalContent += `}\n\n`;

  // Append content of each model file
  for (const modelFile of modelFiles) {
    let modelContent = fs.readFileSync(modelFile, 'utf8');

    // Replace any comment-based file paths with actual content from templates
    modelContent = replaceCommentWithFileContent(modelContent, templatesDir) + '\n';

    finalContent += modelContent;
  }

  // Write the merged content to the final schema.prisma file
  fs.writeFileSync(outputPrismaFile, finalContent, 'utf8');
  console.log('Prisma schema generated at ./prisma/schema.prisma');
}

// Function to generate index.ts file with repository exports
function generateIndexTs() {
  const repositoriesDir = path.resolve('./src/libs/prisma/repositories');
  const repoFiles = fs.readdirSync(repositoriesDir).filter((file) => file.endsWith('.repository.ts'));

  let indexContent = ``;
  indexContent += `// ---------------------------------------------\n`;
  indexContent += `// IMPORTANT! NEVER EDIT THIS FILE DIRECTLY\n`;
  indexContent += `// Please update other models and npm run prisma\n`;
  indexContent += `// ---------------------------------------------\n\n`;
  indexContent += `import { config } from '@/contracts/config.constants';\n`;
  indexContent += `import { PrismaClient } from '@prisma/client';\n\n`;

  indexContent += `// Global variable for Prisma client\n`;
  indexContent += `const globalForPrisma = global as unknown as { prisma: PrismaClient };\n\n`;

  indexContent += `// Prisma client instance\n`;
  indexContent += `export const prisma = globalForPrisma.prisma || new PrismaClient();\n\n`;

  indexContent += `// Set global prisma instance in non-production environments\n`;
  indexContent += `if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;\n\n`;

  // Add static exports for all repositories
  repoFiles.forEach((repo) => {
    const repoName = repo.replace('.repository.ts', '');
    indexContent += `export * from './repositories/${repoName}.repository';\n`;
  });

  // Write the index.ts file
  fs.writeFileSync(outputIndexFile, indexContent, 'utf8');
  console.log('index.ts file generated at ./src/libs/prisma/index.ts');
}

// Execute both functions to generate Prisma schema and index.ts
async function generateFiles() {
  await generatePrismaSchema();
  generateIndexTs();
}

generateFiles().catch(console.error);
