const { createUser, checkUser } = require("./data/users");
const users = require("./data/users");
async function a() {
  // try {
  //   const abc = await createUser("darshil", "123456");
  //   console.log(abc);
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    const abc = await checkUser("darshil", "123456");
    console.log(abc);
  } catch (e) {
    console.log(e);
  }
}
a();
