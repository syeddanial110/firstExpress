const DataModels = require ('../Models/dataModels')
const { v4: uuidv4 } = require('uuid');



exports.getProducts = async(req,res) =>{
    try {
        const products= await DataModels.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
}
exports.getProduct= async(req,res) =>{
    try {
        const id= req.params.id;
        // console.log(req);
        const product= await DataModels.findById(id)

        if (!product) {
            res.writeHead(400,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        } 
        else {
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error);
    }
}

exports.createProduct = async (req,res)=>{
    try {
        // console.log("body" ,req.body);
        const {name,description, price,category}= JSON.parse(JSON.stringify(req.body))

        const product = await DataModels.create({
            name,
            description,
            price,
            category
        })
        
        res.writeHead(201, {"Content-Type": "application/json"})
        return res.end(JSON.stringify(product))
    } catch (error) {
        console.log(error);
        
    }
}


exports.updateProduct = async (req,res)=>{
    try {
        const {id}= req.params;
        const product = await DataModels.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product with this id (${id}) not exist`, })
            );
        } else {
           
            const { name, description, price , category} = JSON.parse(JSON.stringify(req.body));
            const productData = {
              name: name || product.name,
              description: description || product.description,
              price: price || product.price,
              category: category || product.category
            };
            const updProduct = await DataModels.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updProduct));
        }
    } catch (error) {
        
    }
}

exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await DataModels.findById(id);
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product Not Found" }));
      } else {
        await DataModels.remove(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Product ${id} removed` }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  


// module.exports={
//     getProducts,
//     getProduct
// }