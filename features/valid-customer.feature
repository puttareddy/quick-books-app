Feature: Should return database values for known customer

  Background: Issue the request
    When I GET from "/api/v1/customer/A0A0A1"

  Scenario: Response status
    Then the response status should be "200"

  Scenario Outline: <Property>
    Then the property "<Property>" should be "<Value>"

    Examples:
      | Property           | Value                              |
      | location           | Toronto                            |
     
