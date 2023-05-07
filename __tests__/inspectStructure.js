const {DbView} = require ('..')

const MockDb = require ('./lib/MockDb.js')

test ('error', async () => {
		
	const db = new MockDb ()

	const plan = db.createMigrationPlan ()
	
	expect (() => plan.inspectStructure ()).toThrow ()
		
})


test ('main', async () => {
		
	const db = new MockDb ()

	const plan = db.createMigrationPlan ()
	
	plan.toBe.set ('v', new DbView ({name: 'v', sql: 'SELECT 1 id', columns: {id: 'int'}}))
	
	await plan.loadStructure ()

	plan.inspectStructure ()
	
	const {toDo} = plan
	
	expect (toDo.size).toBe (2)
	
	expect (toDo.get ('create').map (i => i.name).sort ()).toStrictEqual (['roles', 'users_roles'])
	expect (toDo.get ('recreate').map (i => i.name)).toStrictEqual (['v'])
		
})


