const Order = require("../models/order.js");
const notificationController = require ("./notificationController.js");

exports.getOrders = function(request, response){
  Order.find({}, function(err, result){
    if(err){
      console.log(err);
      return response.sendStatus(400);
    }
    response.send(result);
  });
};

exports.putOrder = function(request, response){
  if(!request.body){
    return response.sendStatus(400);
  }

  const id = request.body.id;
  const status = request.body.status;
  const channelId = request.body.channelId;

  Order.findByIdAndUpdate(
    id,
    {status: status},
    {new: true},
    function(err, result){
      if(err){
        return console.log(err);
      }

      response.send(result)
  });

  notificationController.sendNotification(status, channelId);
}
