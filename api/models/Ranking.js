/**
 * Ranking
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        rank:  {
            type:'int',
            required:true
        },
        name: {
            type:'string',
            required:true
        },
        score : {
            type:'float',
            required:true
        }
    }

};
