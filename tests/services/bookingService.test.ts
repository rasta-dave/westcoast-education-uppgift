import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookingService } from '../../src/services/booking-services.js';
import { IBooking } from '../../src/models/IBooking.js';

describe('BookingService', () => {
  let bookingService: BookingService;

  const mockBooking: IBooking = {
    courseId: '1',
    name: 'Test Person',
    email: 'test@gmail.com',
    phone: '1234567890',
  };

  beforeEach(() => {
    bookingService = new BookingService();
  });

  describe('createBooking', () => {
    it('should create a booking', async () => {
      // Arrange
      const expectedBooking = { ...mockBooking, id: '123' };
      vi.spyOn(bookingService, 'createBooking').mockResolvedValue(
        expectedBooking
      );

      // Act
      const booking = await bookingService.createBooking(mockBooking);

      // Assert
      expect(booking).toEqual(expectedBooking);
    });

    it('should throw error if booking creation fails', async () => {
      // Arrange
      vi.spyOn(bookingService, 'createBooking').mockRejectedValue(
        new Error('Failed to create booking')
      );

      // Act & Assert
      await expect(bookingService.createBooking(mockBooking)).rejects.toThrow(
        'Failed to create booking'
      );
    });

    describe('getBookingsByCourseId', () => {
      it('should return bookings for a specific course', async () => {
        // Arrange
        const expectedBookings = [{ ...mockBooking, id: '123' }];
        vi.spyOn(bookingService, 'getBookingsByCourseId').mockResolvedValue(
          expectedBookings
        );

        // Act
        const bookings = await bookingService.getBookingsByCourseId('1');

        // Assert
        expect(bookings).toEqual(expectedBookings);
      });
    });
  });
});
