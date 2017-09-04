module.exports = {
    'development':{
        'facebookAuth' : {
            'clientID'      : '629212693919573', // your App ID
            'clientSecret'  : 'ad3623f4772115ccd1af932aa651b4bc', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
            'profileFields' : ['id', 'emails', 'name']
        }
    },
    'test':{
        'facebookAuth' : {
            'clientID'      : '629212693919573', // your App ID
            'clientSecret'  : 'ad3623f4772115ccd1af932aa651b4bc', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
            'profileFields' : ['id', 'emails', 'name']
        }
    },
    'staging':{
        'facebookAuth' : {
            'clientID'      : '629212693919573', // your App ID
            'clientSecret'  : 'ad3623f4772115ccd1af932aa651b4bc', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
            'profileFields' : ['id', 'emails', 'name']
        }
    },
    'production':{
        'facebookAuth' : {
            'clientID'      : '629212693919573', // your App ID
            'clientSecret'  : 'ad3623f4772115ccd1af932aa651b4bc', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
            'profileFields' : ['id', 'emails', 'name']
        }
    }

};
