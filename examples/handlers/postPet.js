const OpenApiValidator = require('src/index');
const apiSpec = require('examples/swagger.json');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const options = {
    apiSpec,
    validateSpec: false, // Setting to false since we have verified that the api spec being used is indeed valid v3 open api spec
    validateRequests: false,
    validateResponses: true,
    removeAdditionalRequestProps: true,
    removeAdditionalResponseProps: true,
    roleAuthorizerKey: 'custom:company_role',
    filterByRole: true,
};

const lambda = async (event, context) => {
    try {
        return [ event.body, 200 ];
    } catch (err) {
        console.log(err);
        return err;
    }
};

const validator = new OpenApiValidator(options, lambda);

exports.lambdaHandler = validator.install();