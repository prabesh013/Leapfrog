var information = {
  name: "Tony Stark",
  address: "Malibu Point",
  emails: "anthony@starkindustries.com",
  interests: "Mark42",
  education: [
    {
      name: "MIT",
      enrolledDate: "2000",
    },
    {
      name: "Standford",
      enrolledDate: "2002",
    },
  ],
};
information.education.forEach(function (e) {
  var s = "Name:" + e.name + ", Date: " + e.enrolledDate;
  console.log(s);
});
