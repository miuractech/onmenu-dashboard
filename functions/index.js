const functions = require("firebase-functions");
const Typesense = require('typesense');
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore()

let client = new Typesense.Client({
  'nodes': [{
    'host': '9r0hqp582uayvodep-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
    'port': '443',
    'protocol': 'https'
  }],
  'apiKey': 'xAtavlhYdaqElxTzpUpCJoiXD7OOijI3',
  'connectionTimeoutSeconds': 2
})

exports.updateTypesense = functions.firestore
    .document('dishes/{restaurantId}/{type}/{dishId}')
    .onWrite((change, context) => {
       if (snapshot.after.data() == null) {
            // Delete
            const documentId = snapshot.before.restaurantId+snapshot.before.dishId;
            functions.logger.debug(`Deleting document ${documentId}`);
            return typesense
                .collections('dishes')
                .documents(documentId)
                .delete();
          } else {
            // Update & create
            const data = snapshot.data()
            const documentId = snapshot.before.restaurantId+snapshot.before.dishId;
            functions.logger.debug(`Updating document ${documentId}`);
            var dish = {}
            ['restaurant_id', 
            'menu_id', 
            'dish_id', 
            'category_id', 
            'dish_name', 
            'description', 
            'speciality_tags', 
            'search_tags', 
            'type', 
            'food_variants',
            'published',
            'options'].forEach(element => {
               dish[element] = JSON.stringify(data[element]) 
            });
            return client
                .collections('dishes')
                .documents(dish.restaurantId+dish.dish_id)
                .update(dish);
          }
    });

exports.checkLoyal = functions.firestore
.document('currentUser/{docId}')
.onCreate( async (snap, context) => {
  try {
    const { mobile, restaurantId,userName }= snap.data()
    // let programs = []
    let totalVisit;
    let totalSpend;
    let tempSpend = 0;
    const loyaltysnap = await db.collection('loyalProgram').where('restaurantId','==',restaurantId).get()
    loyaltysnap.forEach(doc=>{
      const {days,minSpend,minVisit,name} = await doc.data()
      let now =  new Date();
      now.setDate(now.getDate()-parseInt(days));
      const currentUserSnap = await db.collection('currentUser').where('restaurantId','==',restaurantId).where('mobile','==',mobile).where('time','>=',now).get()
      totalVisit =await parseInt(currentUserSnap.size) >= parseInt(minVisit)
      const paymentSnap = await db.collection('payment').where('restaurantId','==',restaurantId).where('mobile','==',mobile.slice(3)).where('time','>=',now).get()
      paymentSnap.forEach(doc=>{
        const { amount } = await doc.data()
        tempSpend = tempSpend +parseFloat(amount)
      })
      totalSpend = tempSpend >= parseFloat(minSpend)
      if(totalSpend && totalVisit){
        const target = {program:name,restaurantId,userName,timeStamp:firestore.FieldValue.serverTimestamp(),mobile,spend:tempSpend,visit:currentUserSnap.size,read:false}
        await db.collection('loyalUser').add(target);
      }
    });
  }
  catch (error) {
    functions.logger.error(error)
  }
})



















    // {
    //     "name":"dishes",
    //     "fields": [
    //        {
    //         "name":"restaurant_id",
    //         "type": "string"
    //       },
    //       {
    //         "name":"menu_id",
    //         "type": "string"
    //       },
    //        {
    //         "name":"dish_id",
    //         "type": "string"
    //       },
    //        {
    //         "name":"category_id",
    //         "type": "string"
    //       },
    //        {
    //         "name":"dish_name",
    //         "type": "string"
    //       },
    //       {
    //         "name":"description",
    //         "type": "string"
    //       },
    //        {
    //         "name":"speciality_tags",
    //         "type": "string"
    //       },
    //        {
    //         "name":"search_tags",
    //         "type": "string"
    //       },
    //        {
    //         "name":"type",
    //         "type": "string"
    //       },
    //        {
    //         "name":"food_variants",
    //         "type": "string"
    //       },
    //        {
    //         "name":"options",
    //         "type": "string"
    //       }
    //     ]
    //   }