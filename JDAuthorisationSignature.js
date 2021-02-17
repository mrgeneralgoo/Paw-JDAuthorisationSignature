var JDAuthorisationSignature = function() {

    this.evaluate = function(context) {

  	if ('requestSend' !== context.runtimeInfo.task) {
      	return '** signature is only generated during request send **';
    }

  	var bodyParameters = context.getCurrentRequest().getUrlEncodedBody(true);

  	var orderedBodyParameters = this.secretKey;

  	Object.keys(bodyParameters).sort().forEach(function(key) {
  		orderedBodyParameters += (key === 'sign' ? '' : (key + bodyParameters[key].getEvaluatedString()));
  	});

  	orderedBodyParameters += this.secretKey;

    return (new DynamicValue('com.luckymarmot.HashDynamicValue', {'input': orderedBodyParameters,'hashType': 2, 'encoding': 0})).getEvaluatedString();
  }

}

JDAuthorisationSignature.identifier = "cn.chengxiaobai.PawExtensions.JDAuthorisationSignature";

JDAuthorisationSignature.title = "JD Authorisation Signature";

JDAuthorisationSignature.help = "https://github.com/mrgeneralgoo/Paw-JDAuthorisationSignature";

JDAuthorisationSignature.inputs = [
    DynamicValueInput('secretKey', 'Secret Access Key', 'SecureValue'),
];

registerDynamicValueClass(JDAuthorisationSignature);