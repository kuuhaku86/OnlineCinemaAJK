const test = require("ava")

const objectDeepFromEntries = require(".")

const isPlainObject = require("./isPlainObject")

test("Should always return a plain object when array given", t => {
  t.plan(1)

  const actual = objectDeepFromEntries([])

  t.true(isPlainObject(actual))
})

test("Should correctly resolve simple (flat) object", t => {
  t.plan(1)

  const expected = {
    name: "John Doe",
    age: 25,
    gender: "Male"
  }

  const actual = objectDeepFromEntries([
    [
      "name", "John Doe"
    ],
    [
      "age", 25
    ],
    [
      "gender", "Male"
    ]
  ])

  t.deepEqual(actual, expected)
})

test("Should correctly create an array", t => {
  t.plan(1)

  const expected = {
    foo: [
      42, "bar", {
        bar: "baz"
      }
    ],
    bar: {
      baz: "boo"
    },
    field: "some whatever value",
    lvl0: {
      lvl1: [
        {
          lvl2: {
            lvlN: 451
          }
        }
      ]
    }
  }

  const actual = objectDeepFromEntries([
    [
      ["foo", 0], 42
    ],
    [
      ["foo", 1], "bar"
    ],
    [
      ["foo", 2, "bar"], "baz"
    ],
    [
      ["bar", "baz"], "boo"
    ],
    [
      ["field"], "some whatever value"
    ],
    [
      ["lvl0", "lvl1", 0, "lvl2", "lvlN"], 451
    ]
  ])

  t.deepEqual(actual, expected)
})

test("Should resolve a complex object", t => {
  t.plan(1)

  const expected = {
    subjects: [
      {
        firstName: "John",
        lastName: "Doe",
        dob: {
          day: 1,
          month: "Jan.",
          year: 1989
        },
        skills: ["Node.js", "CoffeeScript", "JavaScript", "Babel"]
      }, {
        firstName: "Max",
        lastName: "Doe",
        dob: {
          day: 12,
          month: "Mar.",
          year: 1992
        },
        skills: ["Python", "Flask", "JavaScript", "Babel", "React", "Redux"]
      }
    ]
  }

  const actual = objectDeepFromEntries([
    [
      ["subjects", 0, "firstName"], "John"
    ],
    [
      ["subjects", 0, "lastName"], "Doe"
    ],
    [
      ["subjects", 0, "dob", "day"], 1
    ],
    [
      ["subjects", 0, "dob", "month"], "Jan."
    ],
    [
      ["subjects", 0, "dob", "year"], 1989
    ],
    [
      ["subjects", 0, "skills", 0], "Node.js"
    ],
    [
      ["subjects", 0, "skills", 1], "CoffeeScript"
    ],
    [
      ["subjects", 0, "skills", 2], "JavaScript"
    ],
    [
      ["subjects", 0, "skills", 3], "Babel"
    ],

    [
      ["subjects", 1, "firstName"], "Max"
    ],
    [
      ["subjects", 1, "lastName"], "Doe"
    ],
    [
      ["subjects", 1, "dob", "day"], 12
    ],
    [
      ["subjects", 1, "dob", "month"], "Mar."
    ],
    [
      ["subjects", 1, "dob", "year"], 1992
    ],
    [
      ["subjects", 1, "skills", 0], "Python"
    ],
    [
      ["subjects", 1, "skills", 1], "Flask"
    ],
    [
      ["subjects", 1, "skills", 2], "JavaScript"
    ],
    [
      ["subjects", 1, "skills", 3], "Babel"
    ],
    [
      ["subjects", 1, "skills", 4], "React"
    ],
    [
      ["subjects", 1, "skills", 5], "Redux"
    ]
  ])

  t.deepEqual(actual, expected)
})

test("Should return a collection", t => {
  t.plan(1)

  const expected = [
    {
      firstName: "John",
      lastName: "Doe",
      dob: {
        day: 1,
        month: "Jan.",
        year: 1989
      },
      skills: ["Node.js", "CoffeeScript", "JavaScript", "Babel"]
    },
    {
      firstName: "Max",
      lastName: "Doe",
      dob: {
        day: 12,
        month: "Mar.",
        year: 1992
      },
      skills: ["Python", "Flask", "JavaScript", "Babel", "React", "Redux"]
    }
  ]

  const actual = objectDeepFromEntries([
    [
      [0, "firstName"], "John"
    ],
    [
      [0, "lastName"], "Doe"
    ],
    [
      [0, "dob", "day"], 1
    ],
    [
      [0, "dob", "month"], "Jan."
    ],
    [
      [0, "dob", "year"], 1989
    ],
    [
      [0, "skills", 0], "Node.js"
    ],
    [
      [0, "skills", 1], "CoffeeScript"
    ],
    [
      [0, "skills", 2], "JavaScript"
    ],
    [
      [0, "skills", 3], "Babel"
    ],

    [
      [1, "firstName"], "Max"
    ],
    [
      [1, "lastName"], "Doe"
    ],
    [
      [1, "dob", "day"], 12
    ],
    [
      [1, "dob", "month"], "Mar."
    ],
    [
      [1, "dob", "year"], 1992
    ],
    [
      [1, "skills", 0], "Python"
    ],
    [
      [1, "skills", 1], "Flask"
    ],
    [
      [1, "skills", 2], "JavaScript"
    ],
    [
      [1, "skills", 3], "Babel"
    ],
    [
      [1, "skills", 4], "React"
    ],
    [
      [1, "skills", 5], "Redux"
    ]
  ])

  t.deepEqual(actual, expected)
})

test("Should create flat array from entries", t => {
  t.plan(1)

  const expected = ["Zero", "One", "Two", "Three"]

  const actual = objectDeepFromEntries([
    [0, "Zero"],
    [1, "One"],
    [2, "Two"],
    [3, "Three"]
  ])

  t.deepEqual(actual, expected)
})

test("Should create flat array with mixed values", t => {
  t.plan(1)

  const expected = [42, {number: 42}, "Some string"]

  const actual = objectDeepFromEntries([
    [0, 42],
    ["number", 42],
    [2, "Some string"]
  ])

  t.deepEqual(actual, expected)
})

test("Should create deep array with mixed values", t => {
  t.plan(1)

  const expected = [42, {person: {name: "John Doe"}}, "Some string"]

  const actual = objectDeepFromEntries([
    [
      0, 42
    ],
    [
      ["person", "name"], "John Doe"
    ],
    [
      2, "Some string"
    ]
  ])

  t.deepEqual(actual, expected)
})

test("Should throw a TypeError when invoked without any arguments", t => {
  t.plan(3)

  const trap = () => objectDeepFromEntries()

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Expected an array of entries. Received undefined")
})

test("Should throw an error when entries are not an array", t => {
  t.plan(3)

  const trap = () => objectDeepFromEntries({})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Expected an array of entries. Received object")
})
