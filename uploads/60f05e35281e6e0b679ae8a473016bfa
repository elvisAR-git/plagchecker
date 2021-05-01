def find_anomalies(phone_nos, locs, area_codes):
    contradictions = []
    for name in phone_nos.keys():
        if name not in locs.keys():
            continue
        area_code = phone_nos[name][:3]
        loc = locs[name]
        if area_code not in area_codes[loc]:
            contradictions.append(name)
    contradictions.sort()
    return contradictions


if __name__ == '__main__':
    # Here is a simple sample input and test case you can run yourself.
    locs = {'alex': 'CA', 'justin': 'WA', 'anne': 'TX', 'sally': 'NY'}
    phone_nos = {'alex': '2131000000',
                 'sally': '3515000000', 'justin': '3512000000'}
    area_codes = {'CA': set(['213', '351']), 'WA': set(
        ['360']), 'NY': set(['565'])}

    print(find_anomalies(phone_nos, locs, area_codes))
