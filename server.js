const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL Schema
const schema = buildSchema(`
    type Query{
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);



const coursesData = [
    {
        id: 1,
        title: 'Node.js Course',
        author: 'Andrew Mead',
        topic: 'javascript',
        url: 'https://coingd'
    },
    {
        id: 2,
        title: 'Javascript.js Course',
        author: 'Rob Percival',
        topic: 'javascript',
        url: 'https://coingd'
    },
    {
        id: 3,
        title: 'CSS Course',
        author: 'Majocadaw Alex',
        topic: 'CSS',
        url: 'https://coingd'
    }
];

const getCourse = args => {
    const id = args.id;
    return coursesData.filter(course => course.id == id)[0];
}

const getCourses = args => {
    if(args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic == topic);
    }else {
        return coursesData;
    }
}

const updateCourseTopic = ({id, topic}) => {
    coursesData.map(course => {
        if(course.id == id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id == id)[0];
}

const rootValue = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic,
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', graphqlHTTP ({
    schema,
    rootValue,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server up on 4000');
})