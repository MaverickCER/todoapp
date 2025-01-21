# components
This folder is a collection of reusable React components that form the building blocks of the application's user interface (UI). These components are distinct from pages or layouts, as they focus solely on rendering reusable and composable UI elements. They do not fetch data, setup context providers, or define the structure of the application but are used by higher-level constructs like pages or layouts to compose the UI.

In Next.js, components can be categorized as server components or client components, aligning with the React Server Components (RSC) model. This separation leverages the strengths of server-side rendering and client-side interactivity to create efficient, scalable, and interactive web applications.

Almost all client components, with exception to skeletons and stateless components, should be wrapped withErrorBoundary as a higher order component. This ensures that if something goes wrong we can get an automated report about the disruption to the user experience along with all relevant states. This makes it easier to debug issues without being able to reproduce them directly and if all else fails we'll often have user crendentials so that we can proactively reach out, get feedback, and ensure that user's needs are taken care of. 

Most client components should be dynamic, that is lazy loaded, so that we can split the code, reduce the bundle size, and improve performance. In React projects without nextJs this is handled with a useLazyComponent hook.
