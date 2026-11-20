import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const resolveUserId = (req, res) => {
    const { userId } = req.params;
    if (userId !== "current") return userId;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser._id;
  };
  const enrollUserInCourse = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.enrollUserInCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  const unenrollUserFromCourse = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.unenrollUserFromCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
