const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Logistics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/items', require('./routes/items'));
app.use('/customers', require('./routes/customers'));
app.use('/delivery-vehicles', require('./routes/deliveryVehicles'));
app.use('/orders', require('./routes/orders'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
