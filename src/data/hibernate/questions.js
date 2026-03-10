// Hibernate MCQ Questions Pool (120+ questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all Hibernate topics: Introduction, Architecture, Configuration, Mapping, Relationships, HQL, Caching, etc.

export const allQuestions = [
  // ========== HIBERNATE INTRODUCTION & BASICS (20 questions) ==========
  {
    id: 1,
    question: "What is Hibernate?",
    options: ["A programming language", "An ORM (Object-Relational Mapping) framework for Java", "A database", "An IDE"],
    correctAnswer: 1,
    explanation: "Hibernate is an open-source ORM (Object-Relational Mapping) framework for Java that simplifies database operations."
  },
  {
    id: 2,
    question: "What does ORM stand for?",
    options: ["Object-Relational Mapping", "Object-Relational Model", "Object-Relational Method", "Object-Relational Module"],
    correctAnswer: 0,
    explanation: "ORM stands for Object-Relational Mapping, which maps Java objects to database tables."
  },
  {
    id: 3,
    question: "What is the main advantage of Hibernate?",
    options: ["Faster compilation", "Eliminates need for JDBC code", "Smaller code size", "All of the above"],
    correctAnswer: 3,
    explanation: "Hibernate eliminates boilerplate JDBC code, reduces development time, and provides database independence."
  },
  {
    id: 4,
    question: "What is the latest version of Hibernate?",
    options: ["Hibernate 3", "Hibernate 4", "Hibernate 5", "Hibernate 6"],
    correctAnswer: 3,
    explanation: "Hibernate 6 is the latest major version (as of recent releases)."
  },
  {
    id: 5,
    question: "What is Hibernate Session?",
    options: ["A database session", "A lightweight object representing connection between Java application and database", "A web session", "A user session"],
    correctAnswer: 1,
    explanation: "Hibernate Session is a lightweight object that represents a connection between Java application and database."
  },
  {
    id: 6,
    question: "What is SessionFactory in Hibernate?",
    options: ["A factory for sessions", "Thread-safe factory for creating Session instances", "A database factory", "A connection factory"],
    correctAnswer: 1,
    explanation: "SessionFactory is a thread-safe factory for creating Session instances. It's created once per application."
  },
  {
    id: 7,
    question: "What is @Entity annotation used for?",
    options: ["To mark entity", "To mark a class as Hibernate entity", "To mark component", "To mark service"],
    correctAnswer: 1,
    explanation: "@Entity annotation marks a Java class as a Hibernate entity (maps to database table)."
  },
  {
    id: 8,
    question: "What is @Table annotation used for?",
    options: ["To create table", "To specify table name and schema", "To delete table", "To update table"],
    correctAnswer: 1,
    explanation: "@Table annotation specifies the database table name and schema for an entity."
  },
  {
    id: 9,
    question: "What is @Id annotation used for?",
    options: ["To mark ID", "To mark primary key field", "To create ID", "To delete ID"],
    correctAnswer: 1,
    explanation: "@Id annotation marks a field as the primary key of the entity."
  },
  {
    id: 10,
    question: "What is @GeneratedValue used for?",
    options: ["To generate value", "To specify primary key generation strategy", "To create value", "To delete value"],
    correctAnswer: 1,
    explanation: "@GeneratedValue specifies the strategy for generating primary key values (AUTO, IDENTITY, SEQUENCE, TABLE)."
  },
  {
    id: 11,
    question: "What is @Column annotation used for?",
    options: ["To create column", "To map field to database column with custom name/constraints", "To delete column", "To update column"],
    correctAnswer: 1,
    explanation: "@Column annotation maps a field to a database column with custom name, length, nullable, etc."
  },
  {
    id: 12,
    question: "What is the default table name in Hibernate?",
    options: ["Same as class name", "Same as class name with lowercase", "Random name", "Must specify"],
    correctAnswer: 0,
    explanation: "By default, Hibernate uses the class name as the table name."
  },
  {
    id: 13,
    question: "What is the default column name in Hibernate?",
    options: ["Same as field name", "Same as field name with uppercase", "Random name", "Must specify"],
    correctAnswer: 0,
    explanation: "By default, Hibernate uses the field name as the column name."
  },
  {
    id: 14,
    question: "What is Hibernate Configuration?",
    options: ["A class", "Configuration file (hibernate.cfg.xml or properties) that contains database connection details", "A method", "A property"],
    correctAnswer: 1,
    explanation: "Hibernate Configuration file contains database connection details, mapping files, and other settings."
  },
  {
    id: 15,
    question: "What is hibernate.cfg.xml?",
    options: ["A database file", "XML configuration file for Hibernate", "A class file", "A properties file"],
    correctAnswer: 1,
    explanation: "hibernate.cfg.xml is the XML configuration file that contains Hibernate settings and database connection details."
  },
  {
    id: 16,
    question: "What is hibernate.properties?",
    options: ["A database file", "Properties file for Hibernate configuration", "A class file", "An XML file"],
    correctAnswer: 1,
    explanation: "hibernate.properties is an alternative to hibernate.cfg.xml for Hibernate configuration."
  },
  {
    id: 17,
    question: "What is hibernate.dialect used for?",
    options: ["To set language", "To specify database dialect (MySQL, Oracle, PostgreSQL, etc.)", "To set locale", "To set encoding"],
    correctAnswer: 1,
    explanation: "hibernate.dialect specifies the database dialect so Hibernate can generate appropriate SQL for that database."
  },
  {
    id: 18,
    question: "What is hibernate.hbm2ddl.auto used for?",
    options: ["To create DDL", "To control automatic schema generation (create, update, validate, none)", "To delete DDL", "To update DDL"],
    correctAnswer: 1,
    explanation: "hibernate.hbm2ddl.auto controls automatic schema generation: create, update, validate, or none."
  },
  {
    id: 19,
    question: "What is hibernate.show_sql used for?",
    options: ["To show SQL", "To enable logging of SQL statements to console", "To hide SQL", "To create SQL"],
    correctAnswer: 1,
    explanation: "hibernate.show_sql enables logging of SQL statements generated by Hibernate to the console."
  },
  {
    id: 20,
    question: "What is hibernate.format_sql used for?",
    options: ["To format SQL", "To format SQL statements for better readability", "To create SQL", "To delete SQL"],
    correctAnswer: 1,
    explanation: "hibernate.format_sql formats SQL statements for better readability when logging."
  },

  // ========== HIBERNATE SESSION & LIFECYCLE (15 questions) ==========
  {
    id: 21,
    question: "What is Hibernate Session?",
    options: ["A database session", "Lightweight object representing connection between application and database", "A web session", "A user session"],
    correctAnswer: 1,
    explanation: "Hibernate Session is a lightweight object that represents a connection between Java application and database."
  },
  {
    id: 22,
    question: "Is Hibernate Session thread-safe?",
    options: ["Yes", "No, not thread-safe", "Only in singleton scope", "Only in prototype scope"],
    correctAnswer: 1,
    explanation: "Hibernate Session is NOT thread-safe. Each thread should have its own session."
  },
  {
    id: 23,
    question: "How to get Hibernate Session?",
    options: ["new Session()", "sessionFactory.openSession()", "Session.getSession()", "Session.create()"],
    correctAnswer: 1,
    explanation: "Session is obtained from SessionFactory using sessionFactory.openSession() method."
  },
  {
    id: 24,
    question: "What is the difference between openSession() and getCurrentSession()?",
    options: ["No difference", "openSession() creates new session, getCurrentSession() returns current session from context", "getCurrentSession() is deprecated", "openSession() is deprecated"],
    correctAnswer: 1,
    explanation: "openSession() creates a new session, while getCurrentSession() returns the current session from the context (requires transaction)."
  },
  {
    id: 25,
    question: "What is session.save() used for?",
    options: ["To save entity", "To persist entity to database", "To update entity", "To delete entity"],
    correctAnswer: 1,
    explanation: "session.save() persists a new entity to the database and returns the generated ID."
  },
  {
    id: 26,
    question: "What is session.persist() used for?",
    options: ["Same as save()", "Similar to save() but doesn't return ID", "To update", "To delete"],
    correctAnswer: 1,
    explanation: "session.persist() is similar to save() but doesn't return the generated ID (void return type)."
  },
  {
    id: 27,
    question: "What is session.update() used for?",
    options: ["To save new entity", "To update existing entity", "To delete entity", "To find entity"],
    correctAnswer: 1,
    explanation: "session.update() updates an existing entity in the database."
  },
  {
    id: 28,
    question: "What is session.merge() used for?",
    options: ["To merge sessions", "To merge detached entity with current session", "To combine entities", "To split entities"],
    correctAnswer: 1,
    explanation: "session.merge() merges a detached entity with the current session and returns a managed entity."
  },
  {
    id: 29,
    question: "What is session.delete() used for?",
    options: ["To delete session", "To delete entity from database", "To clear session", "To close session"],
    correctAnswer: 1,
    explanation: "session.delete() removes an entity from the database."
  },
  {
    id: 30,
    question: "What is session.get() used for?",
    options: ["To get session", "To retrieve entity by ID (returns null if not found)", "To get all entities", "To get connection"],
    correctAnswer: 1,
    explanation: "session.get() retrieves an entity by ID. Returns null if entity is not found."
  },
  {
    id: 31,
    question: "What is session.load() used for?",
    options: ["Same as get()", "Retrieves entity by ID (throws exception if not found, lazy loading)", "To load all", "To load connection"],
    correctAnswer: 1,
    explanation: "session.load() retrieves entity by ID with lazy loading. Throws exception if not found."
  },
  {
    id: 32,
    question: "What is the difference between get() and load()?",
    options: ["No difference", "get() returns null if not found, load() throws exception. load() uses lazy loading", "get() is deprecated", "load() is deprecated"],
    correctAnswer: 1,
    explanation: "get() returns null if not found and hits database immediately. load() throws exception if not found and uses lazy loading."
  },
  {
    id: 33,
    question: "What is session.flush() used for?",
    options: ["To flush session", "To synchronize session state with database", "To clear session", "To close session"],
    correctAnswer: 1,
    explanation: "session.flush() synchronizes the session state with the database (executes SQL statements)."
  },
  {
    id: 34,
    question: "What is session.clear() used for?",
    options: ["To clear database", "To clear all entities from session cache", "To close session", "To delete session"],
    correctAnswer: 1,
    explanation: "session.clear() removes all entities from the session cache."
  },
  {
    id: 35,
    question: "What is session.close() used for?",
    options: ["To close database", "To close session and release resources", "To clear session", "To delete session"],
    correctAnswer: 1,
    explanation: "session.close() closes the session and releases database connection and resources."
  },

  // ========== HIBERNATE MAPPING (15 questions) ==========
  {
    id: 36,
    question: "What is @Entity annotation?",
    options: ["Marks entity", "Marks class as Hibernate entity", "Marks component", "Marks service"],
    correctAnswer: 1,
    explanation: "@Entity annotation marks a Java class as a Hibernate entity that maps to a database table."
  },
  {
    id: 37,
    question: "What is @Table annotation?",
    options: ["Creates table", "Specifies table name and schema", "Deletes table", "Updates table"],
    correctAnswer: 1,
    explanation: "@Table annotation specifies the database table name and schema for an entity."
  },
  {
    id: 38,
    question: "What is @Id annotation?",
    options: ["Marks ID", "Marks primary key field", "Creates ID", "Deletes ID"],
    correctAnswer: 1,
    explanation: "@Id annotation marks a field as the primary key of the entity."
  },
  {
    id: 39,
    question: "What is @GeneratedValue?",
    options: ["Generates value", "Specifies primary key generation strategy", "Creates value", "Deletes value"],
    correctAnswer: 1,
    explanation: "@GeneratedValue specifies how primary key values are generated (AUTO, IDENTITY, SEQUENCE, TABLE)."
  },
  {
    id: 40,
    question: "What is GenerationType.AUTO?",
    options: ["Manual generation", "Hibernate chooses generation strategy", "No generation", "Random generation"],
    correctAnswer: 1,
    explanation: "GenerationType.AUTO lets Hibernate choose the appropriate generation strategy based on database."
  },
  {
    id: 41,
    question: "What is GenerationType.IDENTITY?",
    options: ["Uses database identity column", "Uses database auto-increment", "Uses sequence", "Uses table"],
    correctAnswer: 1,
    explanation: "GenerationType.IDENTITY uses database auto-increment/identity column (MySQL AUTO_INCREMENT, SQL Server IDENTITY)."
  },
  {
    id: 42,
    question: "What is GenerationType.SEQUENCE?",
    options: ["Uses identity", "Uses database sequence", "Uses table", "Uses auto-increment"],
    correctAnswer: 1,
    explanation: "GenerationType.SEQUENCE uses database sequence (Oracle, PostgreSQL sequences)."
  },
  {
    id: 43,
    question: "What is @Column annotation?",
    options: ["Creates column", "Maps field to column with custom name/constraints", "Deletes column", "Updates column"],
    correctAnswer: 1,
    explanation: "@Column annotation maps a field to a database column with custom name, length, nullable, unique, etc."
  },
  {
    id: 44,
    question: "What is @Transient annotation?",
    options: ["Marks transient", "Marks field as not persistent (not stored in database)", "Marks as persistent", "Marks as required"],
    correctAnswer: 1,
    explanation: "@Transient annotation marks a field as not persistent (field won't be stored in database)."
  },
  {
    id: 45,
    question: "What is @Temporal annotation?",
    options: ["Marks temporal", "Specifies temporal type for Date/Calendar (DATE, TIME, TIMESTAMP)", "Marks as date", "Marks as time"],
    correctAnswer: 1,
    explanation: "@Temporal annotation specifies temporal type for Date/Calendar fields: DATE, TIME, or TIMESTAMP."
  },
  {
    id: 46,
    question: "What is @Lob annotation?",
    options: ["Marks large object", "Marks field as Large Object (BLOB, CLOB)", "Marks as small", "Marks as medium"],
    correctAnswer: 1,
    explanation: "@Lob annotation marks a field as Large Object (BLOB for binary, CLOB for character data)."
  },
  {
    id: 47,
    question: "What is @Enumerated annotation?",
    options: ["Marks enum", "Maps enum to database (ORDINAL or STRING)", "Creates enum", "Deletes enum"],
    correctAnswer: 1,
    explanation: "@Enumerated maps enum to database: ORDINAL (stores index) or STRING (stores name)."
  },
  {
    id: 48,
    question: "What is @Embedded annotation?",
    options: ["Marks embedded", "Marks embeddable class to be embedded in entity", "Creates embedded", "Deletes embedded"],
    correctAnswer: 1,
    explanation: "@Embedded marks an embeddable class to be embedded in an entity (value object pattern)."
  },
  {
    id: 49,
    question: "What is @Embeddable annotation?",
    options: ["Marks embeddable", "Marks class as embeddable (can be embedded in entity)", "Creates embeddable", "Deletes embeddable"],
    correctAnswer: 1,
    explanation: "@Embeddable marks a class as embeddable (can be embedded in another entity)."
  },
  {
    id: 50,
    question: "What is @Version annotation?",
    options: ["Marks version", "Enables optimistic locking with version field", "Creates version", "Deletes version"],
    correctAnswer: 1,
    explanation: "@Version annotation enables optimistic locking by adding a version field that increments on each update."
  },

  // ========== HIBERNATE RELATIONSHIPS (20 questions) ==========
  {
    id: 51,
    question: "What are the types of relationships in Hibernate?",
    options: ["One-to-One, One-to-Many", "One-to-One, One-to-Many, Many-to-One, Many-to-Many", "Only One-to-Many", "Only Many-to-Many"],
    correctAnswer: 1,
    explanation: "Hibernate supports: One-to-One, One-to-Many, Many-to-One, and Many-to-Many relationships."
  },
  {
    id: 52,
    question: "What is @OneToOne annotation?",
    options: ["Marks one-to-one", "Maps one-to-one relationship", "Creates relationship", "Deletes relationship"],
    correctAnswer: 1,
    explanation: "@OneToOne annotation maps a one-to-one relationship between two entities."
  },
  {
    id: 53,
    question: "What is @OneToMany annotation?",
    options: ["Marks one-to-many", "Maps one-to-many relationship", "Creates relationship", "Deletes relationship"],
    correctAnswer: 1,
    explanation: "@OneToMany annotation maps a one-to-many relationship (one entity to multiple entities)."
  },
  {
    id: 54,
    question: "What is @ManyToOne annotation?",
    options: ["Marks many-to-one", "Maps many-to-one relationship", "Creates relationship", "Deletes relationship"],
    correctAnswer: 1,
    explanation: "@ManyToOne annotation maps a many-to-one relationship (many entities to one entity)."
  },
  {
    id: 55,
    question: "What is @ManyToMany annotation?",
    options: ["Marks many-to-many", "Maps many-to-many relationship", "Creates relationship", "Deletes relationship"],
    correctAnswer: 1,
    explanation: "@ManyToMany annotation maps a many-to-many relationship between two entities."
  },
  {
    id: 56,
    question: "What is mappedBy attribute?",
    options: ["Maps by", "Specifies inverse side of bidirectional relationship", "Maps to", "Maps from"],
    correctAnswer: 1,
    explanation: "mappedBy specifies the inverse (non-owning) side of a bidirectional relationship."
  },
  {
    id: 57,
    question: "What is @JoinColumn annotation?",
    options: ["Creates join column", "Specifies foreign key column name", "Deletes join column", "Updates join column"],
    correctAnswer: 1,
    explanation: "@JoinColumn annotation specifies the foreign key column name for relationships."
  },
  {
    id: 58,
    question: "What is @JoinTable annotation?",
    options: ["Creates join table", "Specifies join table for many-to-many relationship", "Deletes join table", "Updates join table"],
    correctAnswer: 1,
    explanation: "@JoinTable annotation specifies the join table name and columns for many-to-many relationships."
  },
  {
    id: 59,
    question: "What is cascade in Hibernate?",
    options: ["A waterfall", "Operation propagation from parent to child entities", "A database", "A table"],
    correctAnswer: 1,
    explanation: "Cascade propagates operations (save, update, delete) from parent entity to child entities."
  },
  {
    id: 60,
    question: "What is CascadeType.ALL?",
    options: ["No cascade", "Cascades all operations (persist, merge, remove, refresh, detach)", "Only persist", "Only remove"],
    correctAnswer: 1,
    explanation: "CascadeType.ALL cascades all operations: persist, merge, remove, refresh, and detach."
  },
  {
    id: 61,
    question: "What is CascadeType.PERSIST?",
    options: ["No persist", "Cascades persist/save operation", "Cascades delete", "Cascades update"],
    correctAnswer: 1,
    explanation: "CascadeType.PERSIST cascades the persist/save operation to child entities."
  },
  {
    id: 62,
    question: "What is CascadeType.REMOVE?",
    options: ["No remove", "Cascades remove/delete operation", "Cascades save", "Cascades update"],
    correctAnswer: 1,
    explanation: "CascadeType.REMOVE cascades the remove/delete operation to child entities."
  },
  {
    id: 63,
    question: "What is fetch type in Hibernate?",
    options: ["How to fetch", "Strategy for loading related entities (EAGER or LAZY)", "How to save", "How to delete"],
    correctAnswer: 1,
    explanation: "Fetch type determines when related entities are loaded: EAGER (immediately) or LAZY (on demand)."
  },
  {
    id: 64,
    question: "What is FetchType.EAGER?",
    options: ["Lazy loading", "Eager loading (loads immediately)", "No loading", "Partial loading"],
    correctAnswer: 1,
    explanation: "FetchType.EAGER loads related entities immediately when parent entity is loaded."
  },
  {
    id: 65,
    question: "What is FetchType.LAZY?",
    options: ["Eager loading", "Lazy loading (loads on demand)", "No loading", "Partial loading"],
    correctAnswer: 1,
    explanation: "FetchType.LAZY loads related entities only when accessed (on demand)."
  },
  {
    id: 66,
    question: "What is LazyInitializationException?",
    options: ["Exception on save", "Exception when accessing lazy-loaded entity outside session", "Exception on delete", "Exception on update"],
    correctAnswer: 1,
    explanation: "LazyInitializationException occurs when trying to access a lazy-loaded entity after the session is closed."
  },
  {
    id: 67,
    question: "How to avoid LazyInitializationException?",
    options: ["Cannot avoid", "Use EAGER fetch, keep session open, or use Hibernate.initialize()", "Close session early", "Don't use relationships"],
    correctAnswer: 1,
    explanation: "Avoid by using EAGER fetch, keeping session open, using Hibernate.initialize(), or using @Transactional."
  },
  {
    id: 68,
    question: "What is orphan removal?",
    options: ["Removing orphans", "Automatic removal of child entities when removed from parent collection", "Removing parent", "Removing all"],
    correctAnswer: 1,
    explanation: "Orphan removal automatically deletes child entities when they're removed from the parent's collection."
  },
  {
    id: 69,
    question: "What is @OneToMany(orphanRemoval=true)?",
    options: ["No orphan removal", "Enables orphan removal for one-to-many relationship", "Disables removal", "Enables cascade"],
    correctAnswer: 1,
    explanation: "orphanRemoval=true enables automatic deletion of child entities when removed from parent collection."
  },
  {
    id: 70,
    question: "What is bidirectional relationship?",
    options: ["One-way relationship", "Relationship where both entities reference each other", "No relationship", "Multiple relationships"],
    correctAnswer: 1,
    explanation: "Bidirectional relationship means both entities have references to each other (e.g., Student has Courses, Course has Students)."
  },

  // ========== HIBERNATE QUERY LANGUAGE (HQL) (15 questions) ==========
  {
    id: 71,
    question: "What is HQL?",
    options: ["Hibernate Query Language", "Hibernate Quality Language", "Hibernate Quick Language", "Hibernate Query Library"],
    correctAnswer: 0,
    explanation: "HQL stands for Hibernate Query Language, an object-oriented query language similar to SQL."
  },
  {
    id: 72,
    question: "What is the difference between HQL and SQL?",
    options: ["No difference", "HQL works with entities/objects, SQL works with tables", "HQL is faster", "SQL is object-oriented"],
    correctAnswer: 1,
    explanation: "HQL works with entities and objects, while SQL works with database tables and columns."
  },
  {
    id: 73,
    question: "What is session.createQuery() used for?",
    options: ["To create query", "To create HQL query", "To create SQL", "To create entity"],
    correctAnswer: 1,
    explanation: "session.createQuery() creates an HQL query from a string."
  },
  {
    id: 74,
    question: "What is session.createSQLQuery() used for?",
    options: ["To create HQL", "To create native SQL query", "To create entity", "To create session"],
    correctAnswer: 1,
    explanation: "session.createSQLQuery() creates a native SQL query (database-specific SQL)."
  },
  {
    id: 75,
    question: "What is Query.setParameter() used for?",
    options: ["To set parameter", "To set named parameter value in query", "To get parameter", "To delete parameter"],
    correctAnswer: 1,
    explanation: "Query.setParameter() sets the value of a named parameter (e.g., :name) in the query."
  },
  {
    id: 76,
    question: "What is Query.list() used for?",
    options: ["To list queries", "To execute query and return list of results", "To list parameters", "To list entities"],
    correctAnswer: 1,
    explanation: "Query.list() executes the query and returns a list of results."
  },
  {
    id: 77,
    question: "What is Query.uniqueResult() used for?",
    options: ["To get unique query", "To execute query and return single result", "To get all results", "To get first result"],
    correctAnswer: 1,
    explanation: "Query.uniqueResult() executes the query and returns a single result (throws exception if multiple results)."
  },
  {
    id: 78,
    question: "What is Query.setFirstResult() used for?",
    options: ["To set first", "To set first result index for pagination", "To get first", "To delete first"],
    correctAnswer: 1,
    explanation: "Query.setFirstResult() sets the index of the first result (for pagination - OFFSET)."
  },
  {
    id: 79,
    question: "What is Query.setMaxResults() used for?",
    options: ["To set max", "To set maximum number of results (for pagination - LIMIT)", "To get max", "To delete max"],
    correctAnswer: 1,
    explanation: "Query.setMaxResults() sets the maximum number of results to return (for pagination - LIMIT)."
  },
  {
    id: 80,
    question: "What is Criteria API in Hibernate?",
    options: ["A database", "Programmatic API for building type-safe queries", "A query language", "An annotation"],
    correctAnswer: 1,
    explanation: "Criteria API is a programmatic, type-safe way to build queries in Hibernate."
  },
  {
    id: 81,
    question: "What is @NamedQuery annotation?",
    options: ["Marks named query", "Defines named HQL query that can be reused", "Creates query", "Deletes query"],
    correctAnswer: 1,
    explanation: "@NamedQuery annotation defines a named HQL query that can be referenced by name and reused."
  },
  {
    id: 82,
    question: "What is @NamedQueries annotation?",
    options: ["Marks named queries", "Container for multiple @NamedQuery annotations", "Creates queries", "Deletes queries"],
    correctAnswer: 1,
    explanation: "@NamedQueries is a container annotation for multiple @NamedQuery annotations."
  },
  {
    id: 83,
    question: "What is Query.getNamedQuery() used for?",
    options: ["To get query", "To get named query by name", "To create query", "To delete query"],
    correctAnswer: 1,
    explanation: "session.getNamedQuery() retrieves a named query by its name."
  },
  {
    id: 84,
    question: "What is projection in HQL?",
    options: ["A table", "Selecting specific columns/fields instead of entire entities", "A query", "A result"],
    correctAnswer: 1,
    explanation: "Projection in HQL means selecting specific columns/fields instead of entire entities."
  },
  {
    id: 85,
    question: "What is aggregate function in HQL?",
    options: ["A function", "Functions like COUNT, SUM, AVG, MAX, MIN", "Only COUNT", "Only SUM"],
    correctAnswer: 1,
    explanation: "HQL supports aggregate functions: COUNT, SUM, AVG, MAX, MIN for calculations."
  },

  // ========== HIBERNATE CACHING (10 questions) ==========
  {
    id: 86,
    question: "What is Hibernate caching?",
    options: ["Storing cache", "Storing frequently accessed data in memory to improve performance", "Storing database", "Storing session"],
    correctAnswer: 1,
    explanation: "Hibernate caching stores frequently accessed data in memory to reduce database hits and improve performance."
  },
  {
    id: 87,
    question: "What are the types of caching in Hibernate?",
    options: ["Only first-level", "First-level and second-level cache", "Only second-level", "No caching"],
    correctAnswer: 1,
    explanation: "Hibernate has two cache levels: first-level cache (session cache) and second-level cache (session factory cache)."
  },
  {
    id: 88,
    question: "What is first-level cache?",
    options: ["Database cache", "Session-level cache (enabled by default)", "Application cache", "Network cache"],
    correctAnswer: 1,
    explanation: "First-level cache is session-level cache that stores entities within a session (enabled by default)."
  },
  {
    id: 89,
    question: "What is second-level cache?",
    options: ["Session cache", "SessionFactory-level cache (shared across sessions)", "Database cache", "Application cache"],
    correctAnswer: 1,
    explanation: "Second-level cache is SessionFactory-level cache shared across all sessions (requires configuration)."
  },
  {
    id: 90,
    question: "What is @Cacheable annotation?",
    options: ["Marks cacheable", "Enables second-level caching for entity", "Disables cache", "Creates cache"],
    correctAnswer: 1,
    explanation: "@Cacheable annotation enables second-level caching for an entity."
  },
  {
    id: 91,
    question: "What is @Cache annotation?",
    options: ["Marks cache", "Configures caching strategy (usage, region)", "Creates cache", "Deletes cache"],
    correctAnswer: 1,
    explanation: "@Cache annotation configures caching strategy including usage (READ_ONLY, READ_WRITE) and region."
  },
  {
    id: 92,
    question: "What is CacheConcurrencyStrategy?",
    options: ["Cache strategy", "Defines how cache handles concurrent access", "Cache type", "Cache size"],
    correctAnswer: 1,
    explanation: "CacheConcurrencyStrategy defines how the cache handles concurrent access (READ_ONLY, READ_WRITE, NONSTRICT_READ_WRITE, TRANSACTIONAL)."
  },
  {
    id: 93,
    question: "What is query cache?",
    options: ["Cache for queries", "Caches query results", "Cache for entities", "Cache for sessions"],
    correctAnswer: 1,
    explanation: "Query cache caches the results of queries, not just entities."
  },
  {
    id: 94,
    question: "How to enable query cache?",
    options: ["Cannot enable", "Set hibernate.cache.use_query_cache=true and use setCacheable(true)", "Only in Spring", "Only in Spring Boot"],
    correctAnswer: 1,
    explanation: "Enable by setting hibernate.cache.use_query_cache=true and calling query.setCacheable(true)."
  },
  {
    id: 95,
    question: "What are popular second-level cache providers?",
    options: ["Only EhCache", "EhCache, Hazelcast, Infinispan, Redis", "Only Redis", "Only Hazelcast"],
    correctAnswer: 1,
    explanation: "Popular second-level cache providers: EhCache, Hazelcast, Infinispan, Redis, etc."
  },

  // ========== HIBERNATE TRANSACTIONS & LOCKING (10 questions) ==========
  {
    id: 96,
    question: "What is transaction in Hibernate?",
    options: ["A database", "A unit of work that groups operations", "A table", "A query"],
    correctAnswer: 1,
    explanation: "Transaction is a unit of work that groups database operations into a single atomic operation."
  },
  {
    id: 97,
    question: "What is session.beginTransaction() used for?",
    options: ["To begin session", "To start a new transaction", "To end transaction", "To commit transaction"],
    correctAnswer: 1,
    explanation: "session.beginTransaction() starts a new database transaction."
  },
  {
    id: 98,
    question: "What is transaction.commit() used for?",
    options: ["To start transaction", "To commit transaction and save changes", "To rollback", "To begin"],
    correctAnswer: 1,
    explanation: "transaction.commit() commits the transaction and saves all changes to the database."
  },
  {
    id: 99,
    question: "What is transaction.rollback() used for?",
    options: ["To commit", "To rollback transaction and discard changes", "To begin", "To save"],
    correctAnswer: 1,
    explanation: "transaction.rollback() rolls back the transaction and discards all changes."
  },
  {
    id: 100,
    question: "What is optimistic locking?",
    options: ["Locking with locks", "Version-based locking (checks version before update)", "Pessimistic locking", "No locking"],
    correctAnswer: 1,
    explanation: "Optimistic locking uses version fields to check if entity was modified before updating (prevents lost updates)."
  },
  {
    id: 101,
    question: "What is pessimistic locking?",
    options: ["Version-based", "Database-level locking (locks row during transaction)", "Optimistic locking", "No locking"],
    correctAnswer: 1,
    explanation: "Pessimistic locking locks database rows during transaction to prevent concurrent modifications."
  },
  {
    id: 102,
    question: "What is LockMode?",
    options: ["Lock mode", "Defines locking strategy (NONE, READ, WRITE, UPGRADE)", "Lock type", "Lock level"],
    correctAnswer: 1,
    explanation: "LockMode defines locking strategy: NONE, READ, WRITE, UPGRADE, etc."
  },
  {
    id: 103,
    question: "What is session.lock() used for?",
    options: ["To lock session", "To explicitly lock an entity", "To unlock", "To delete"],
    correctAnswer: 1,
    explanation: "session.lock() explicitly locks an entity with specified lock mode."
  },
  {
    id: 104,
    question: "What is OptimisticLockException?",
    options: ["Exception on save", "Exception when optimistic lock fails (version mismatch)", "Exception on delete", "Exception on update"],
    correctAnswer: 1,
    explanation: "OptimisticLockException occurs when optimistic locking fails (entity version doesn't match)."
  },
  {
    id: 105,
    question: "What is @Version annotation used for?",
    options: ["Marks version", "Enables optimistic locking with version field", "Creates version", "Deletes version"],
    correctAnswer: 1,
    explanation: "@Version annotation enables optimistic locking by adding a version field that increments on updates."
  },

  // ========== HIBERNATE MISCELLANEOUS (5 questions) ==========
  {
    id: 106,
    question: "What is Hibernate Validator?",
    options: ["A validator", "Bean Validation (JSR-303) implementation for Hibernate", "A database", "A query"],
    correctAnswer: 1,
    explanation: "Hibernate Validator is the reference implementation of Bean Validation (JSR-303) for validating entities."
  },
  {
    id: 107,
    question: "What is @NotNull annotation?",
    options: ["Marks not null", "Validates that field is not null", "Creates null", "Allows null"],
    correctAnswer: 1,
    explanation: "@NotNull annotation (from Bean Validation) validates that a field is not null."
  },
  {
    id: 108,
    question: "What is @Size annotation?",
    options: ["Marks size", "Validates size of string/collection (min, max)", "Creates size", "Deletes size"],
    correctAnswer: 1,
    explanation: "@Size annotation validates the size of a string or collection (min, max length)."
  },
  {
    id: 109,
    question: "What is @Email annotation?",
    options: ["Marks email", "Validates email format", "Creates email", "Deletes email"],
    correctAnswer: 1,
    explanation: "@Email annotation validates that a string is in valid email format."
  },
  {
    id: 110,
    question: "What is Hibernate Tools?",
    options: ["A database", "Eclipse plugin for Hibernate development", "A query tool", "A validation tool"],
    correctAnswer: 1,
    explanation: "Hibernate Tools is an Eclipse plugin that provides tools for Hibernate development (reverse engineering, code generation)."
  }
];

// Function to get random questions for exam
export const getRandomQuestions = (count = 20) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

