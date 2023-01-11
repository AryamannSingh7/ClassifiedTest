Feature: DocumentListChairman

    Scenario: User navigates to DocumentListChairman
        Given I am a User loading DocumentListChairman
        When I navigate to the DocumentListChairman
        Then DocumentListChairman will load with out errors
        Then Should load the documents list
        And Should open the add document modal
        And Should open the add resolution modal
        And Should close the add document modal when click on outside
        And Should close the add document modal when click on close icon
        And Should submit the add document when click on submit
        And Should close the add document modal when click on cancel button
        And Should close the delete document modal when click on outside
        And Should close the delete document modal when click on cancel button
        And Should delete the document
        And Should delete the resolution
        And Should close the resolution button when click on outside
        And Should close the resolution button when click on close icon
        And Should able to add resolution name
        And Should able to remove the uploaded resolution file
        And Should open meeting minute module when click on choose meeting
        And Should open meeting minute module when click on change meeting
        And Should close resolution modal when click on cancel modal
        And Should create the resolution
        And Should close the select meeting minute modal when click on outside
        And Should close the select meeting minute modal when click on close icon
        And Should close the select meeting minute modal when click on cancel button
        And Should close the select meeting minute modal when click on create button
        And DocumentListChairman resolution documents load
        And Should load the meeting minute