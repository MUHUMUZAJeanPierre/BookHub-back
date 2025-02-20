const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    pages: [{ 
        type: String, 
        required: true 
    }],
});

const BookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 5 
    },
    status: { 
        type: String, 
        enum: ["Read", "Unread"], 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    categories: { 
        type: String, 
        enum: ["All Genres", "Business", "Technology", "Romantic", "Adventure", "Fictional"], 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    chapters: [ChapterSchema],
});

module.exports = mongoose.model("Book", BookSchema);
