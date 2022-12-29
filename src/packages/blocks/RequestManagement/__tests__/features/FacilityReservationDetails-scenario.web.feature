Feature: FacilityReservationDetails

     Scenario: User navigates to FacilityReservationDetails
        Given I am a User loading FacilityReservationDetails
        When I navigate to the FacilityReservationDetails
        Then FacilityReservationDetails will load with out errors
        Then I can go back to Facility details page
        Then Should load the facility ReservationList Details
        Then should check componentDidMount
        Then Should delete the facility Reservation details
        Then Should cancel delete the facility Reservation details
        Then Should load the Upcoming facility ReservationList Details
        Then Should cancel update the facility Reservation details