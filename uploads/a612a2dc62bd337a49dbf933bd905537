def students_skipped(programming_zoom, research_zoom, ssi_staff):
    # TODO: Your code here (~ 10-20 lines of code)
    main_list = programming_zoom + research_zoom + ssi_staff

    programming_zoom = set(programming_zoom)
    research_zoom = set(research_zoom)
    ssi_staff = set(ssi_staff)

    attended_both = programming_zoom.intersection(research_zoom)
    skipped = []

    for record in main_list:
        if not record in ssi_staff and not record in attended_both:
            skipped.append(record)

    return len(skipped)


if __name__ == '__main__':
    # Test your code with this example case here
    programming_zoom = ["Alex", "Jessica", "Billy", "Susan", "Billy"]
    research_zoom = ["Franklyn", "Billy", "Susan", "Wendy", "Alice"]
    ssi_staff = ["Alex", "Franklyn"]

    # Jessica, Wendy, and Alice are the three students who did not attend both
    print(students_skipped(programming_zoom, research_zoom, ssi_staff))
