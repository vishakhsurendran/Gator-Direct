// dbId matches the `buildings` table; null means no indoor data for that building.

export const UF_BUILDINGS = [
  // Computer Science & Engineering
  { name: 'Malachowsky Hall',                      lat: 29.6440, lng: -82.3477, dbId: 1  },
  { name: 'Weil Hall',                             lat: 29.6461, lng: -82.3497, dbId: null },
  { name: 'New Engineering Building',              lat: 29.6463, lng: -82.3490, dbId: null },
  { name: 'CSE Building',                          lat: 29.6468, lng: -82.3494, dbId: null },
  { name: 'Larsen Hall',                           lat: 29.6457, lng: -82.3498, dbId: null },
  { name: 'Benton Hall',                           lat: 29.6459, lng: -82.3503, dbId: null },
  { name: 'Sisler Hall',                           lat: 29.6462, lng: -82.3501, dbId: null },
  { name: 'Rhines Hall',                           lat: 29.6455, lng: -82.3503, dbId: null },
  { name: 'Black Hall',                            lat: 29.6462, lng: -82.3505, dbId: null },
  // Libraries
  { name: 'Library West',                          lat: 29.6479, lng: -82.3430, dbId: null },
  { name: 'Marston Science Library',               lat: 29.6485, lng: -82.3449, dbId: null },
  { name: 'Smathers Library',                      lat: 29.6489, lng: -82.3438, dbId: null },
  // Liberal Arts & Sciences
  { name: 'Turlington Hall',                       lat: 29.6477, lng: -82.3437, dbId: null },
  { name: 'Anderson Hall',                         lat: 29.6474, lng: -82.3438, dbId: null },
  { name: 'Newell Hall',                           lat: 29.6476, lng: -82.3436, dbId: null },
  { name: 'Little Hall',                           lat: 29.6483, lng: -82.3461, dbId: null },
  { name: 'Bartram Hall',                          lat: 29.6468, lng: -82.3451, dbId: null },
  { name: 'Dauer Hall',                            lat: 29.6490, lng: -82.3450, dbId: null },
  { name: 'Grinter Hall',                          lat: 29.6467, lng: -82.3442, dbId: null },
  { name: 'Leigh Hall',                            lat: 29.6488, lng: -82.3447, dbId: null },
  { name: 'Williamson Hall',                       lat: 29.6463, lng: -82.3426, dbId: null },
  { name: 'Bryant Space Science Center',           lat: 29.6459, lng: -82.3444, dbId: null },
  { name: 'Psychology Building',                   lat: 29.6474, lng: -82.3462, dbId: null },
  { name: 'Flint Hall',                            lat: 29.6484, lng: -82.3445, dbId: null },
  { name: 'Rolfs Hall',                            lat: 29.6484, lng: -82.3451, dbId: null },
  { name: 'Carr Hall',                             lat: 29.6473, lng: -82.3456, dbId: null },
  { name: 'Nuclear Sciences Building',             lat: 29.6470, lng: -82.3454, dbId: null },
  // Business
  { name: 'Bryan Hall',                            lat: 29.6459, lng: -82.3434, dbId: null },
  { name: 'Matherly Hall',                         lat: 29.6456, lng: -82.3429, dbId: null },
  { name: 'Stuzin Hall',                           lat: 29.6450, lng: -82.3426, dbId: null },
  { name: 'Heavener Hall',                         lat: 29.6453, lng: -82.3422, dbId: null },
  { name: 'Hough Hall',                            lat: 29.6446, lng: -82.3430, dbId: null },
  // Education
  { name: 'Norman Hall',                           lat: 29.6452, lng: -82.3430, dbId: null },
  // Law
  { name: 'Holland Law Center',                    lat: 29.6441, lng: -82.3437, dbId: null },
  // Architecture & Design
  { name: 'Architecture Building',                 lat: 29.6445, lng: -82.3416, dbId: null },
  { name: 'Rinker Hall',                           lat: 29.6461, lng: -82.3418, dbId: null },
  // Journalism
  { name: 'Weimer Hall',                           lat: 29.6453, lng: -82.3413, dbId: null },
  // Arts & Performance
  { name: 'Music Building',                        lat: 29.6455, lng: -82.3453, dbId: null },
  { name: 'Constans Theatre',                      lat: 29.6449, lng: -82.3449, dbId: null },
  { name: 'University Auditorium',                 lat: 29.6489, lng: -82.3430, dbId: null },
  // Student Life
  { name: 'Reitz Student Union',                   lat: 29.6438, lng: -82.3468, dbId: null },
  { name: 'Florida Gymnasium',                     lat: 29.6495, lng: -82.3466, dbId: null },
  { name: "O'Connell Center",                      lat: 29.6488, lng: -82.3484, dbId: null },
  // Landmarks
  { name: 'Century Tower',                         lat: 29.6482, lng: -82.3435, dbId: null },
  { name: 'Ben Hill Griffin Stadium',              lat: 29.6499, lng: -82.3488, dbId: null },
  // Agriculture & Life Sciences
  { name: 'McCarty Hall A',                        lat: 29.6443, lng: -82.3481, dbId: null },
  { name: 'Fifield Hall',                          lat: 29.6437, lng: -82.3490, dbId: null },
  { name: 'Newins-Ziegler Hall',                   lat: 29.6433, lng: -82.3480, dbId: null },
  // Museum
  { name: 'Florida Museum of Natural History',     lat: 29.6442, lng: -82.3470, dbId: null },
  // Administration
  { name: 'Tigert Hall',                           lat: 29.6490, lng: -82.3427, dbId: null },
  { name: 'Peabody Hall',                          lat: 29.6486, lng: -82.3437, dbId: null },
  { name: 'Walker Hall',                           lat: 29.6492, lng: -82.3442, dbId: null },
  // Student Housing
  { name: 'Hume Hall',                             lat: 29.6497, lng: -82.3416, dbId: null },
  { name: 'Broward Hall',                          lat: 29.6470, lng: -82.3415, dbId: null },
  { name: 'Jennings Hall',                         lat: 29.6503, lng: -82.3437, dbId: null },
  { name: 'Murphree Hall',                         lat: 29.6506, lng: -82.3440, dbId: null },
  { name: 'Buckman Hall',                          lat: 29.6509, lng: -82.3445, dbId: null },
  { name: 'Thomas Hall',                           lat: 29.6509, lng: -82.3441, dbId: null },
  { name: 'Beaty Towers',                          lat: 29.6505, lng: -82.3427, dbId: null },
  { name: 'Rawlings Hall',                         lat: 29.6500, lng: -82.3451, dbId: null },
  { name: 'Tolbert Hall',                          lat: 29.6474, lng: -82.3410, dbId: null },
  { name: 'Sledd Hall',                            lat: 29.6501, lng: -82.3444, dbId: null },
];
