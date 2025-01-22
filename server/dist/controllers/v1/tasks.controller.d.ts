import { Request, Response } from 'express';

declare function create(req: Request, res: Response): Promise<void>;
declare function read(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<void>;
declare function remove(req: Request, res: Response): Promise<void>;

export { create, read, remove, update };
