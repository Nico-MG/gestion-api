const data = [
    {
      "idp": "P009",
      "cit":2,
      "precio": 5000,
      "suma":100
    },
       {
      "idp": "P008",
      "cit":2,
      "precio": 5000,
      "suma":100
    }
]


for (const product in data){
    for (const field in data[product]){
	console.log(data[product][field]);
	// if(regular_expression.test(field)){
	//     return res.send(field);
	//}
    }
   
}
