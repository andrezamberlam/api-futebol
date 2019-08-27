const graphql = require('graphql');
const userType = require('../../types/userType');
const { User, userSchema } = require('../../../models/user');
const enums = require('../../../utils/enums');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const mutation = {
  type: new graphql.GraphQLList(userType.type),
  args: {
    input: {
      type: new graphql.GraphQLList(userType.inputTypeMutation)
    }
  },
  resolve: async (value, { input }, req) => {
    if (!req.isAuth) {
      throw new Error('Não Autorizado');
    }
    try {
      const promisesUsers = input.map(async inputUser => {
        switch (inputUser.mutationType) {
          case enums.mutationType.ADD:
            return addUser(inputUser)
              .then(result => {
                1;
                return result;
              })
              .catch(err => {
                return err;
              });
          case enums.mutationType.UPDATE:
            updateUser(inputUser);
            break;
          case enums.mutationType.DELETE:
            deleteUser(inputUser);
            break;
          default:
            throw new Error('Opa! Não encontramos a operação para um usuario.');//err;
        }
      });
      await Promise.all(promisesUsers).then((results) => {
        let resultado = [];
        let erros = false;
        results.map(async resultUser => {
          if (!!resultUser.errors)
            erros = true;
          resultado.push(resultUser);
        });
        if (erros)
          return (new Error('Opa! Não encontramos a operação para um usuario.'));
        else
          return resultado;
      }).catch((err) => {
        return err
      });

      //users;
    } catch (err) {

    }
    // return new Promise((resolve, reject) => {
    //   let promisesUsers = input.map(async inputUser => {
    //     switch (inputUser.mutationType) {
    //       case enums.mutationType.ADD:
    //         return addUser(inputUser)
    //           .then(result => {
    //             return result;
    //           })
    //           .catch(err => {
    //             return err;
    //           });;
    //       case enums.mutationType.UPDATE:
    //         updateUser(inputUser);
    //         break;
    //       case enums.mutationType.DELETE:
    //         deleteUser(inputUser);
    //         break;
    //       default:
    //         throw new Error('Opa! Não encontramos a operação para um usuario.');//err;
    //     }
    //   });

    //   Promise.all(promisesUsers).then((results) => {
    //     let resultado = [];
    //     let erros = false;
    //     results.map(async resultUser => {
    //       if (!!resultUser.errors)
    //         erros = true;
    //       resultado.push(resultUser);
    //     });
    //     if (erros)
    //       reject(new Error('Opa! Não encontramos a operação para um usuario.'));
    //     else
    //       resolve(resultado);
    //   })
    //     .catch((err) => { return err });
    // });
  }
};

const addUser = async (userAdd) => {
  try {
    const user = new User(userAdd);
    //VERIFICAR USUARIO, ainda fazer
    if (!userAdd.password) {
      return { errors: "erro de senha ôeee" };
    }
    const hashedPassword = await bcrypt.hash(userAdd.password, 12);//.then(hashedPassword => {
    user.password = hashedPassword;
    const result = await user.save();

    return { ...result._doc };
    // .then(result => {
    //   return { ...result._doc };
    // }).catch(err => {
    //   return err;
    // });



  } catch (err) {
    throw err;
  }
};

const updateUser = (userAdd) => {
  console.log('update essa porra ai', userAdd);
};

const deleteUser = (userAdd) => {
  console.log('deleta essa porra ai', userAdd);
};

module.exports = mutation;          