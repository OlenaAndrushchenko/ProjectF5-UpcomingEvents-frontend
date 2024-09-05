import Repository from "../models/Repository";

export default class EventsRepository extends Repository {
    constructor(uri) {
        super(uri);
    }

    async getByType(query) {
        try {
            const url = `${this.uri}?${query}`;
            console.log('Fetching from URL:', url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data fetched:', data); // Agrega este log para depuración
            return data;
        } catch (error) {
            console.error('Failed to fetch events:', error.message);
            throw new Error('Error loading Events API');
        }
    }

    async getFeaturedEvents() {
        try {
            const url = `${this.uri}/featured`;
            console.log('Fetching featured events from URL:', url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Featured events fetched:', data);
            return data;
        } catch (error) {
            console.error('Failed to fetch featured events:', error.message);
            throw new Error('Error loading featured events API');
        }
    }
}
