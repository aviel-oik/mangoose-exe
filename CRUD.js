/**************************************************************
====================== CREATE ======================
**************************************************************/

// Create simple
const user = await User.create({
  name: "Aviel",
  email: "a@mail.com",
  age: 25
});

// Create avec instance
const newUser = new User({ name: "John" });
await newUser.save();

// Insert plusieurs
await User.insertMany([
  { name: "A" },
  { name: "B" }
]);



/**************************************************************
======================= READ ======================
**************************************************************/

// Tous les documents
const users = await User.find();

// Avec condition
await User.find({ role: "admin" });

// Premier trouvé
await User.findOne({ email: "a@mail.com" });

// Par ID
await User.findById(id);

// Projection (choisir champs)
await User.find().select("name email");

// Exclure champ
await User.find().select("-__v");

// Limiter résultats
await User.find().limit(10);

// Skip (pagination)
await User.find().skip(10);

// Trier
await User.find().sort({ age: 1 });   // asc
await User.find().sort({ age: -1 });  // desc

// Compter
await User.countDocuments({ role: "admin" });

// Existe ?
await User.exists({ email: "a@mail.com" });



/**************************************************************
======================= UPDATE ======================
**************************************************************/

// Update un (premier trouvé)
await User.updateOne(
  { email: "a@mail.com" },
  { age: 30 }
);

// Update plusieurs
await User.updateMany(
  { role: "user" },
  { role: "agent" }
);

// Update par ID + retourner modifié
await User.findByIdAndUpdate(
  id,
  { age: 35 },
  { new: true, runValidators: true }
);

// findOneAndUpdate
await User.findOneAndUpdate(
  { email: "a@mail.com" },
  { age: 40 },
  { new: true }
);



/**************************************************************
================= UPDATE OPERATORS (TRÈS IMPORTANT) ==========
**************************************************************/

// Incrementer
await User.updateOne(
  { _id: id },
  { $inc: { age: 1 } }
);

// Ajouter dans array
await User.updateOne(
  { _id: id },
  { $push: { hobbies: "football" } }
);

// Ajouter sans doublon
await User.updateOne(
  { _id: id },
  { $addToSet: { hobbies: "tennis" } }
);

// Supprimer élément array
await User.updateOne(
  { _id: id },
  { $pull: { hobbies: "football" } }
);

// Modifier champ précis
await User.updateOne(
  { _id: id },
  { $set: { name: "New Name" } }
);

// Supprimer champ
await User.updateOne(
  { _id: id },
  { $unset: { age: "" } }
);



/**************************************************************
======================= DELETE ======================
**************************************************************/

// Delete un
await User.deleteOne({ _id: id });

// Delete plusieurs
await User.deleteMany({ role: "guest" });

// Delete par ID
await User.findByIdAndDelete(id);

// findOneAndDelete
await User.findOneAndDelete({ email: "a@mail.com" });



/**************************************************************
======================= QUERIES AVANCÉES ======================
**************************************************************/

// > (greater than)
await User.find({ age: { $gt: 18 } });

// >=
await User.find({ age: { $gte: 18 } });

// <
await User.find({ age: { $lt: 50 } });

// IN
await User.find({ role: { $in: ["admin", "agent"] } });

// AND
await User.find({
  $and: [{ role: "admin" }, { age: { $gt: 20 } }]
});

// OR
await User.find({
  $or: [{ role: "admin" }, { age: { $lt: 18 } }]
});

// Regex (search)
await User.find({
  name: { $regex: "avi", $options: "i" }
});



/**************************************************************
======================= PAGINATION (EXAM CLASSIC) =============
**************************************************************/

const page = 1;
const limit = 10;

await User.find()
  .skip((page - 1) * limit)
  .limit(limit);



/**************************************************************
======================= BONNES OPTIONS ======================
**************************************************************/

// retourner doc modifié
{ new  true }

// activer validations schema
{ runValidators: true }

// transformer en objet JS simple (plus rapide)
await User.find().lean();
