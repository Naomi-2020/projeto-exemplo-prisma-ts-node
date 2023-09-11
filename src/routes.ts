import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserContoller } from './controllers/user/AuthUserControlles';

const router = Router();

// router.get('/teste', (req: Request, res: Response) => {

//   throw new Error("TEST HERE!!!!")
  
//   return res.json({ok: true})
// })

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserContoller(). handle)

export { router };