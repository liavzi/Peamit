import Order = require("../models/OrderModel");
import orderSchema = require("../schemas/orderSchema");
class OrderFactory{	
	createNewOrder(cb:(err:Error,order? : orderSchema.IOrder)=>any){
		Order.create({},(err,newOrder)=>{
			if (err) return cb(err);
			newOrder.status = orderSchema.OrderStatus.open;
			newOrder.shipmentFee = 25;
			cb(null,newOrder); 
		});
	}
}

export = new OrderFactory();