import Events from "../models/Events";

export default class EventsService {
    #repo;

    constructor(repository) {
        this.#repo = repository;
    }

    async getEvents(page = 0, size = 6) {
        try {
            const data = await this.#repo.getByType(`page=${page}&size=${size}`);

            if (!data || !Array.isArray(data.content)) {
                throw new Error('La respuesta de la API no es un array de eventos válido.');
            }

            const events = data.content.map(event => {
                return new Events(
                    event.title,
                    event.date,
                    event.maxparticipants,
                    event.description,
                    event.imageUrl,
                    event.isFeatured,
                    event.location,
                    event.time
                );
            });

            return { events, totalPages: data.totalPages }; 
        } catch (error) {
            console.error('Error al obtener eventos:', error.message);
            throw new Error('Error loading Events API');
        }
    }

    async getFeaturedEvents() {
        try {
            const data = await this.#repo.getFeaturedEvents();
    
            if (!data || !Array.isArray(data)) {
                throw new Error('The API response is not a valid array of events.');
            }
    
            const events = data.map(event => new Events(
                event.title,
                event.date,
                event.maxparticipants,
                event.description,
                event.imageUrl,
                event.isFeatured,
                event.location,
                event.time
            ));
    
            return events;
        } catch (error) {
            console.error('Error fetching featured events:', error.message);
            throw new Error('Error loading featured events API');
        }
    }
}
