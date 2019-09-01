import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetController from './app/controllers/MeetupController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import ManagerController from './app/controllers/ManagerController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({ message: 'api is alive' });
});
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/meets', MeetController.index);
routes.post('/meets', MeetController.store);
routes.post('/meets/:idMeet', MeetController.update);
routes.delete('/meets/:idMeet', MeetController.delete);

routes.get('/manager', ManagerController.index);
routes.get('/manager/:idMeet', ManagerController.show);

routes.get('/subscription', SubscriptionController.index);
routes.post('/subscription', SubscriptionController.store);
routes.delete('/subscription/:idSubscription', SubscriptionController.delete);
export default routes;
