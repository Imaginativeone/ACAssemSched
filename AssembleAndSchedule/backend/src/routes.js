const express = require("express");
const router = express.Router();

import AssemFile from "../models/assemFile.js";
import AssemFileData from "../config/assemFileData.js";
import { sequelize } from "./database.js";

const sequelize = new sequelize('postgres::memory')


/* --------- CRUD Asemfiles ------- */
router.get("/assemFiles", (req, res) => {
  // return sequelize.models.AssemFile
  models.AssemFile
    .findAll()
    .then((files) => res.send(files))
    .catch((err) => {
      console.log("There was an error querying files", JSON.stringify(err));
      return res.send(err);
    });
});

router.get("/assemFiles:Id", (req, res) => {
    return sequelize.models.assemFile
      .findAll(req.params.Id)
      .then((data) => res.send(data))
      .catch((err) => {
        console.log("There was an error querying files", JSON.stringify(err));
        return res.send(err);
      });
  });

router.post("/assemFiles", async (req, res) => {
  try {
    const file = await models.AssemFile.create({
        id: req.body.Id,
        id_file: req.params.Id,
        fileName: req.body.fileName,
        owner: req.body.owner, 
        processed: req.body.procssed, 
        createdAt: req.body.createdAt 
      });
    return res.send(file);
  } catch (err) {
    console.log(
      "***There was an error creating a the file in the database",
      JSON.stringify(contact)
    );
    return res.status(400).send(err);
  }
});

router.delete("/assemFile/:id", (req, res) => {
  const id = req.params.id;
  return sequelize.models.assemFile
    .findById(id)
    .then((data) => assemFile.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log("***Error deleting file", JSON.stringify(err));
      res.status(400).send(err);
    });
});


/* *****************--------- Read/Write AssemfileData -------***************************** */
router.get("/assemFileData/", async (req, res) => {
  // TODO: Parse data from file
  const assemfileData = sequelize.models.assemFileData;
  return sequelize.models.assemfileData
    .findAll({where: {assemFileData:req.params.body}})
    .then((data) => res.send(data))
    .catch((err) => {
      console.log("There was an error querying file data", JSON.stringify(err));
      return res.send(err);
    });
});

router.get("/assemFileData/:assemFileDataId", async (req, res) => {
  // return data per id containing to project number
  await assemFileData.findAll(req.params.assemFileDataId)
    .then((data) => {
      res.send(data);
    })
    .catch(console.log);
});

router.get("/assemFileData/:assemFileDataId", async (req, res) => {
  const assemFileDataId = req.params.id;
  return sequelize.models.assemFileDataId
    .findByPk(assemFileDataId)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log("There was an error querying file data", JSON.stringify(err));
      return res.send(err);
    });
});

router.post("/assemFileData/assemfileDataId", async (req, res) => {
  const { id, owner, createdAt, proj_no, customized_item, upd_grp, upd_seq, int_ext, grille_type, 
          plan_fin_dt, grille, sort1, sort2, sort3, sort4, sort5, sort6, 
          feat1, feat2, feat3, feat4, feat5, feat6, feat7, lino, prp_qty } = req.body;
  return await sequelize.models.assemFileData
    .create({ 
      id:'', 
      owner:'', 
      createdAt:'',
      proj_no: '',
      customized_item: '',
      upd_grp: '',
      upd_seq: '',
      plan_fin_dt: '',
      grille: "",
      sort1: '',
      sort2: '',
      sort3: '',
      sort4: '',
      sort5: '',
      sort6: '',
      feat1: '',
      feat2: '',
      feat3: '',
      feat4: '',
      feat5: '',
      feat6: '',
      feat7: '',
      lino: '',
      prp_qty: '',
      int_ext: "",
      grille_type: "", 
    })
    .then((data) => {
        return res.send(data);
    })
    .catch((err) => {
      console.log(
        "***There was an error writing to the database***",
        JSON.stringify(err)
      );
      return res.status(400).send(err);
    });
});

/* To Do
1. PUT to update cell data

*/
router.put("/assemFileData/assemFileDataId", async (req, res) => {
  const id = req.params.assemFileDataId;
  return await sequelize.models.assemFileData.findByPk(id).then((id) => {
  return assemFileDataId
      .update({ id })
      .then(() => res.send(id))
      .catch((err) => {
        console.log("***Error updating cell", JSON.stringify(err));
        res.status(400).send(err);
      });
  });
});


// Update Project data
router.put("/file/:assemFileId/assemFileData/:assemFileId/proj_no", async (req, res) => {
  // TODO: What will this change?
  const user = await sequelize.models.assemFileData.findById(proj_no);
  if (!proj_no) {
    console.log("No user with id of", proj_no);
    return res.send({});
  }
  proj_no = await assemFileData(req.params.assemFileId.proj_no);
  if (!proj_no) {
    console.log("No rating with id of", proj_no);
    return res.send({});
  }
});



/* --------- Example CRUD Ratings ------- */

// router.delete("/user/:userId/picture/:pictureId/rating", async (req, res) => {
//   // TODO: delete the rating by the given user for the given picture.
//   const id = await sequelize.models.user.findById(ratingId);
//   return sequelize.models.rating
//     .findById(id)
//     .then((rating) => rating.destroy({ force: true }))
//     .then(() => res.send({ id }))
//     .catch((err) => {
//       console.log("***Error deleting rating", JSON.stringify(err));
//       res.status(400).send(err);
//     });
// });

// router.get("/user/:userId/ratings", async (req, res) => {
//   // TODO: Get all the user's ratings.
//   // Returns the picture name, id and rating for each rating
//   const { userId } = req.params;
//   let results = await sequelize.models.rating.findAll({
//     where: { user_id: userId },
//   });
//   console.log(results);

//   // If the result is empty, return an empty list instead
//   if (results && Object.keys(results).length === 0) {
//     return res.send([]);
//   }
//   return res.send(results);
// });


// router.post("", async (req, res) => {
  //   // TODO: create a rating by the given user for the given picture.
  //   const { userId, pictureId } = req.params;
  //   const user = await sequelize.models.user.findById(userId);
  //   if (!user) {
  //     console.log("No user with id of", userId);
  //     return res.send({});
  //   }
  //   const pod = await getPod(pictureId);
  //   if (!pod) {
  //     console.log("No pod with id of", pictureId);
  //     return res.send({});
  //   }
  
  //   const stars = req.body.stars;
  //   if (!stars) {
  //     console.log("No stars in request body");
  //     return res.send({});
  //   }
  
  //   const [rating, created] = await sequelize.models.rating.findOrCreate({
  //     where: { user_id: userId, pod_id: podId },
  //     defaults: {
  //       user_id: userId,
  //       pod_id: podId,
  //       stars: stars,
  //     },
  //   });
  
  //   // If we found an outdated record, update it
  //   if (!created && rating.stars !== stars) {
  //     await sequelize.models.rating.update(
  //       {
  //         stars: stars,
  //       },
  //       {
  //         where: { id: rating.id },
  //       }
  //     );
  //   }
  //   return res.send(rating);
  // });
  
  // router.get("/user/:userId/picture/:pictureId/rating", async (req, res) => {
  //   // TODO: read the rating by the given user for the given picture.
  //   // const { userId, rating } = req.params;
  //   const user = await sequelize.models.user.findById(userId);
  //   if (!user) {
  //     console.log("No user with id of", userId);
  //     return res.send({});
  //   }
  //   const rating = await getPod(rating);
  //   if (!rating) {
  //     console.log("No rating with id of", rating);
  //     return res.send({});
  //   }
  // });