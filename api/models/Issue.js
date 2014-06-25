/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    master_code: {
        type:'string',
        required:true
    },
	odds : {
		type:'float',
		required:true
	}
  }

};
