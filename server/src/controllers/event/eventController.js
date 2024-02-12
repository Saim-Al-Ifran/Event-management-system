const CustomError = require("../../errors/CustomError");
const Event = require("../../models/Event");
const { deleteImageFromCloudinary } = require("../../utils/deleteImageFromCloudinary");
const { uploadImageToCloudinary } = require("../../utils/imageUploadCloudinary");

const getEvents = async(_req,res,next)=>{
       try{
              const events = await Event.find({});
              if(events.length === 0 ){
                    return next(new CustomError('No events found!',404));
              }
              res.status(200).json({events:events});
       }catch(err){
              next(new CustomError(err.message,500));
       }
}

const createEvent = async (req, res, next) => {
    try {
      
        const { title, description, date, location, capacity, category,price } = req.body;

        const cloudinaryResult = await uploadImageToCloudinary(req.file);
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            capacity,
            image: cloudinaryResult.secure_url,
            category,
            price
        });

 
        const savedEvent = await newEvent.save();

        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (err) {
        next(new CustomError(err.message,500));
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { title, description, date, location, capacity, category, price } = req.body;
        const image = req.file;

        const existingEvent = await Event.findById(eventId);
        if (!existingEvent) {
            return next(new CustomError('Event not found', 404));
        }

        let updatedImageUrl = existingEvent.image;
        if (image) {
            const cloudinaryResult = await uploadImageToCloudinary(image);
            updatedImageUrl = cloudinaryResult.secure_url;
        }

        existingEvent.title = title || existingEvent.title;
        existingEvent.description = description || existingEvent.description;
        existingEvent.date = date || existingEvent.date;
        existingEvent.location = location || existingEvent.location;
        existingEvent.capacity = capacity || existingEvent.capacity;
        existingEvent.category = category || existingEvent.category;
        existingEvent.price = price || existingEvent.price;
        existingEvent.image = updatedImageUrl;

        await existingEvent.save();

        res.status(200).json({ message: 'Event updated successfully', event: existingEvent });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const deleteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        const existingEvent = await Event.findById(eventId);

        if (!existingEvent) {
            return next(new CustomError('Event not found', 404));
        }

        if (existingEvent.image) {
            await deleteImageFromCloudinary(existingEvent.image);
        }

        await Event.deleteOne({ _id: existingEvent._id });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new CustomError('Invalid event ID', 400));
        }
        next(new CustomError(err.message, 500));
    }
};

const duplicateEvent = async (req, res, next) => {
    try {
      
        const { eventId } = req.params;
        const originalEvent = await Event.findById(eventId);

        if (!originalEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
       
        const duplicatedEvent = new Event({
            title: originalEvent.title + ' (Copy)',  
            description: originalEvent.description,
            date: originalEvent.date,
            location: originalEvent.location,
            capacity: originalEvent.capacity,
            image: originalEvent.image,  
            category: originalEvent.category,
            price: originalEvent.price,
          
        });
  
        const savedDuplicatedEvent = await duplicatedEvent.save();
        res.status(201).json({ message: 'Event duplicated successfully', event: savedDuplicatedEvent });

    } catch (err) {
        next(new CustomError(err.message,500));
    }
};

 


const sortEvents = async (req, res, next) => {
    try {
        
        const { sortOrder } = req.query;
      
        const allowedSortOrders = ['asc', 'desc'];
        if (!allowedSortOrders.includes(sortOrder)) {
            return res.status(400).json({ message: 'Invalid sorting order' });
        }
        const events = await Event.find().sort({ date: sortOrder });      
        res.status(200).json({ events });

    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};



module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    duplicateEvent,
    sortEvents,
    deleteEvent
};
