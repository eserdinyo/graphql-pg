query getSingleCourse($courseID: Int!) {
    course(id: $courseID) {
      title
      author
    }
}


query getCoursesForTopic($courseTopic: String!) {
    courses(topic: $courseTopic) {
      title
      author
    }
}

mutation updateCourseTopic($id: Int!, $topic: String!) {
    updateCourseTopic(id: $id, topic: $topic) {
      ...course
    }
  }
  
  fragment course on Course {
    title
    topic
    author
    url
   }


  