import { combineReducers } from 'redux';
import activeReminderReducers from './activeReminderReducers';
import activeTaskReducers from './activeTaskReducers';
import activeUserReducers from './activeUserReducers';
import loginModalReducers from './loginModalReducers';
import loginReducers from './loginReducers';
import registerModalReducers from './registerModalReducers';
import reminderReducers from './reminderReducers';
import roleReducers from './roleReducers';
import taskReducers from './taskReducers';
import userReducers from './userReducers';
import notificationModalReducers from './notificationModalReducers';






const reducers=combineReducers({    
   activeTaskReducers,taskReducers,activeUserReducers,userReducers,
   loginModalReducers,loginReducers,roleReducers,reminderReducers,activeReminderReducers,registerModalReducers,notificationModalReducers
})
export default reducers;