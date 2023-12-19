import express from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices from '../Controllers/Service/readServices.js';
import { body, checkSchema, query, validationResult } from 'express-validator';

const serviceRouter = express.Router();


const checkSchemac = ()=> checkSchema({
  partnerId: {
    errorMessage: "Invalid partner ID",
    isMongoId: true
  },
  categoryId: {
    errorMessage: "Invalid category ID",
    isMongoId: true
  },
  name: {
    isLength: {
      options: { min: 3 },
      errorMessage: "The name should be at least 3 characters long"
    },
    isString: {
      errorMessage: "Name must be a string"
    }
  },
  description: {
    isString: {
      errorMessage: "Description must be a string"
    },
    optional: { options: { nullable: true } }
  },
  price: {
    isNumeric: {
      errorMessage: "Price must be a numeric value"
    },
    optional: { options: { nullable: true } }
  },
  availability: {
    isBoolean: {
      errorMessage: "Availability must be a boolean"
    },
    optional: { options: { nullable: true } }
  }
  // Uncomment and modify if you need to include ratings
  // ratings: {
  //   isArray: {
  //     errorMessage: "Ratings must be an array"
  //   },
  //   optional: { options: { nullable: true } }
  // }
})

serviceRouter.post('/services',checkSchema({
  partnerId: {
    errorMessage: "Invalid partner ID",
    isMongoId: false
  },
  categoryId: {
    errorMessage: "Invalid category ID",
    isMongoId: true
  },
  name: {
    isLength: {
      options: { min: 3 },
      errorMessage: "The name should be at least 3 characters long"
    },
    isString: {
      errorMessage: "Name must be a string"
    }
  },
  description: {
    isString: {
      errorMessage: "Description must be a string"
    },
    optional: { options: { nullable: true } }
  },
  price: {
    isNumeric: {
      errorMessage: "Price must be a numeric value"
    },
    optional: { options: { nullable: true } }
  },
  availability: {
    isBoolean: {
      errorMessage: "Availability must be a boolean"
    },
    optional: { options: { nullable: true } }
  }
}),
(req, res) => {
  const result = validationResult(req);

  if()
  
}
,createService);
serviceRouter.get('/services/:id',readService);
serviceRouter.get('/services',readServices);

serviceRouter.put('/services',updateService);
serviceRouter.delete('/services', deleteService);

export default serviceRouter;
