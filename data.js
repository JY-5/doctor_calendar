const calendar = {
    '111': {'doctorID': '111', 'firstName': 'Julius', 'lastName': 'Hibbert',
            'appointments': [{'appID': '1111', 'firstName': 'Jenny', 'lastName': 'Smith',
                'date': '05/09/2018', 'time': '8:00AM', 'kind': 'New Patient'}]},
    '222': {'doctorID': '222', 'firstName': 'Algemop', 'lastName': 'Krieger',
            'appointments': [{'appID': '2222', 'firstName': 'Sterling', 'lastName': 'Archer',
                              'date': '05/09/2018', 'time': '8:15AM', 'kind': 'New Patient'},
                             {'appID': '2223', 'firstName': 'Cyril', 'lastName': 'Figis',
                              'date': '05/09/2018', 'time': '8:30AM', 'kind': 'Follow-up'}]}
};

const doctors = {
    '111': {'doctorID': '111', 'firstName': 'Julius', 'lastName': 'Hibbert'},
    '222': {'doctorID': '222', 'firstName': 'Algemop', 'lastName': 'Krieger'}
};

function deleteApp(appID) {
    Object.values(calendar).forEach((doctor) => {
        doctor.appointments.forEach((app, idx) => {
            if (app.appID === appID) {
                doctor.appointments.splice(idx, 1);
            }
        })
    }) 
}

const data = {
    calendar,
    doctors,
    deleteApp
};

module.exports = data;
