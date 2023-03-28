const express = require("express");
const router = express.Router();

import { sequelize } from "./database";

/* --------- CRUD files ------- */
router.get("/assemFiles", (req, res) => {
  return sequelize.models.assemFile
    .findAll()
    .then((files) => res.send(files))
    .catch((err) => {
      console.log("There was an error querying files", JSON.stringify(err));
      return res.send(err);
    });
});

router.get("/assemFilesId", (req, res) => {
    return sequelize.models.assemFile
      .findAll()
      .then((assemFileId) => res.send(assemFileId))
      .catch((err) => {
        console.log("There was an error querying files", JSON.stringify(err));
        return res.send(err);
      });
  });

router.post("/assemFiles", (req, res) => {
  const { fileName, id, owner, processed, createdAt } = req.body;
  return sequelize.models.assemFile
    .create({ fileName, owner, processed, id, createdAt })
    .then((assemFile) => res.send(assemFile))
    .catch((err) => {
      console.log(
        "***There was an error creating a the file in the database",
        JSON.stringify(contact)
      );
      return res.status(400).send(err);
    });
});

router.delete("/assemFile/:id", (req, res) => {
  const id = req.params.id;
  return sequelize.models.assemFile
    .findById(id)
    .then((assemFileId) => assemFile.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log("***Error deleting file", JSON.stringify(err));
      res.status(400).send(err);
    });
});

// router.put("/assemFile/:id", (req, res) => {
//   const id = req.params.id;
//   return sequelize.models.assemFile.findById(id).then((fileName) => {
//     const { fileName, owner } = req.body;
//     return user
//       .update({ fileName, owner })
//       .then(() => res.send(user))
//       .catch((err) => {
//         console.log("***Error updating file", JSON.stringify(err));
//         res.status(400).send(err);
//       });
//   });
// });


/* --------- Read Assem Data ------- */
router.get("/assemFileData/:id", async (req, res) => {
  // TODO: Parse data from file
  const assemfileData = sequelize.models.assemfileData;
  return sequelize.models.assemfileData
    .findAll({where: {assemFileId:req.params.id}})
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

router.post("/assemFileData/assemfileDataId", (req, res) => {
  const { id, owner, createdAt, proj_no, customized_item, upd_grp, upd_seq, int_ext, grille_type, 
          plan_fin_dt, grille, sort1, sort2, sort3, sort4, sort5, sort6, 
          feat1, feat2, feat3, feat4, feat5, feat6, feat7, lino, prp_qty } = req.body;
  return sequelize.models.assemFileData
    .create({ id, owner, createdAt, proj_no, customized_item, upd_grp, upd_seq, int_ext, grille_type, 
        plan_fin_dt, grille, sort1, sort2, sort3, sort4, sort5, sort6, 
        feat1, feat2, feat3, feat4, feat5, feat6, feat7, lino, prp_qty })
    .then((assemFileData) => {
        return res.send(assemFileData);
    })
    .catch((err) => {
      console.log(
        "***There was an error creating a rating",
        JSON.stringify(contact)
      );
      return res.status(400).send(err);
    });
});

router.put("/assemFileData/assemFileDataId", (req, res) => {
  const id = req.params.pictureId;
  return sequelize.models.pictures.findByPk(id).then((id) => {
    // const { id, stars } = req.body;
    return rating
      .update({ id })
      .then(() => res.send(pod))
      .catch((err) => {
        console.log("***Error updating pod", JSON.stringify(err));
        res.status(400).send(err);
      });
  });
});

/* --------- CRUD Ratings ------- */
router.post("", async (req, res) => {
  // TODO: create a rating by the given user for the given picture.
  const { userId, pictureId } = req.params;
  const user = await sequelize.models.user.findById(userId);
  if (!user) {
    console.log("No user with id of", userId);
    return res.send({});
  }
  const pod = await getPod(pictureId);
  if (!pod) {
    console.log("No pod with id of", pictureId);
    return res.send({});
  }

  const stars = req.body.stars;
  if (!stars) {
    console.log("No stars in request body");
    return res.send({});
  }

  const [rating, created] = await sequelize.models.rating.findOrCreate({
    where: { user_id: userId, pod_id: podId },
    defaults: {
      user_id: userId,
      pod_id: podId,
      stars: stars,
    },
  });

  // If we found an outdated record, update it
  if (!created && rating.stars !== stars) {
    await sequelize.models.rating.update(
      {
        stars: stars,
      },
      {
        where: { id: rating.id },
      }
    );
  }
  return res.send(rating);
});

router.get("/user/:userId/picture/:pictureId/rating", async (req, res) => {
  // TODO: read the rating by the given user for the given picture.
  // const { userId, rating } = req.params;
  const user = await sequelize.models.user.findById(userId);
  if (!user) {
    console.log("No user with id of", userId);
    return res.send({});
  }
  const rating = await getPod(rating);
  if (!rating) {
    console.log("No rating with id of", rating);
    return res.send({});
  }
});

// Update Project data
router.put("/file/:assemFileId/assemFileData/:assemFileId/proj_no", async (req, res) => {
  // TODO: update the rating by the given user for the given picture.
  const user = await sequelize.models.fileId.findById(userId);
  if (!user) {
    console.log("No user with id of", userId);
    return res.send({});
  }
  rating = await getPod(req.params.ratingId);
  if (!rating) {
    console.log("No rating with id of", rating);
    return res.send({});
  }
});

router.delete("/user/:userId/picture/:pictureId/rating", async (req, res) => {
  // TODO: delete the rating by the given user for the given picture.
  const id = await sequelize.models.user.findById(ratingId);
  return sequelize.models.rating
    .findById(id)
    .then((rating) => rating.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log("***Error deleting rating", JSON.stringify(err));
      res.status(400).send(err);
    });
});

router.get("/user/:userId/ratings", async (req, res) => {
  // TODO: Get all the user's ratings.
  // Returns the picture name, id and rating for each rating
  const { userId } = req.params;
  let results = await sequelize.models.rating.findAll({
    where: { user_id: userId },
  });
  console.log(results);

  // If the result is empty, return an empty list instead
  if (results && Object.keys(results).length === 0) {
    return res.send([]);
  }
  return res.send(results);
});
