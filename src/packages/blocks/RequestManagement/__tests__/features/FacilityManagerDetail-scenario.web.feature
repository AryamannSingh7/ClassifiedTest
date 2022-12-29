Feature: FacilityManagerDetail

     Scenario: User navigates to FacilityManagerDetail
        Given I am a User loading FacilityManagerDetail
        When I navigate to the FacilityManagerDetail
        Then FacilityManagerDetail will load with out errors
        Then should check componentDidMount
        Then Should load the facility ReservationList Details
        Then Should reject the facility Reservation details
        Then Should Approve the facility Reservation details
        Then Should cancel the facility Reservation details
        Then Should click on image cross button