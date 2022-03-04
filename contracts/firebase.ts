declare module '@ioc:Firebase' {
  // Export everything from Mongoose
  // Since that's what our provider is doing
  import * as admin from 'firebase-admin'
  export = admin
}
