'use strict'

const rewire = require('rewire');
const mongojs = require('mongojs');
const dbActions = rewire('../../actions/db-actions');
const errorCodes = rewire('../../actions/error-codes');
const sinon = require('sinon');
const expect = require('chai').expect;
const ERROR_CODE = 400;

describe('DB Actions', () => {
	describe('Insert Post', () => {
		let req;
		let dbMock;
		beforeEach(() => {
			req = {
				body: {
					'message': 'Hi Spartan117'
				}
			}
			dbMock = {
				posts: {
					insert: () => {}
				}
			}
		});
		it('Should add an empty comments array to req.body', () => {
			dbActions.insertPost(req);
			expect(req.body.comments).to.deep.equal([]);
		});
		it('Rejects when error is returned', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.insert = sinon.stub(dbMock.posts, 'insert');
			dbMock.posts.insert.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.insertPost(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when no doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.insert = sinon.stub(dbMock.posts, 'insert');
			dbMock.posts.insert.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.insertPost(req)
			.catch((err) => {
				console.log(err);
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is length 0', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.insert = sinon.stub(dbMock.posts, 'insert');
			dbMock.posts.insert.callsArgWith(1, null, []);
			dbActions.__set__({ 'db': dbMock });
			dbActions.insertPost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Resolves when doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.insert = sinon.stub(dbMock.posts, 'insert');
			dbMock.posts.insert.callsArgWith(1, null, {'message': 'Finishing this fight'});
			dbActions.__set__({ 'db': dbMock });
			dbActions.insertPost(req)
			.then((doc) => {
				expect(doc).to.deep.equal({'message': 'Finishing this fight'});
				dbActions.__set__({ 'db': db });
				done();
			})
		});
	});
	describe('Retrieve Post', () => {
		let req;
		let dbMock;
		let mongojsStub;
		beforeEach(() => {
			mongojsStub = sinon.stub(mongojs, 'ObjectId');
			req = {
				body: {
					'message': 'Hi Spartan117'
				},
				params: {
					'id': '57b50dca44d42e140bbb377b'
				}
			}
			dbMock = {
				posts: {
					findOne: () => {}
				}
			}
		});
		afterEach(() => {
			mongojsStub.restore();
		});
		it('Rejects when error is returned', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findOne = sinon.stub(dbMock.posts, 'findOne');
			dbMock.posts.findOne.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.retrievePost(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when no doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findOne = sinon.stub(dbMock.posts, 'findOne');
			dbMock.posts.findOne.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.retrievePost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is length 0', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findOne = sinon.stub(dbMock.posts, 'findOne');
			dbMock.posts.findOne.callsArgWith(1, null, []);
			dbActions.__set__({ 'db': dbMock });
			dbActions.retrievePost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Resolves when doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findOne = sinon.stub(dbMock.posts, 'findOne');
			dbMock.posts.findOne.callsArgWith(1, null, {'message': 'Finishing this fight'});
			dbActions.__set__({ 'db': dbMock });
			dbActions.retrievePost(req)
			.then((doc) => {
				expect(doc).to.deep.equal({'message': 'Finishing this fight'});
				dbActions.__set__({ 'db': db });
				done();
			})
		});
	});
	describe('Modify Post', () => {
		let req;
		let dbMock;
		let mongojsStub;
		beforeEach(() => {
			mongojsStub = sinon.stub(mongojs, 'ObjectId');
			req = {
				body: {
					'message': 'Hi Spartan117'
				},
				params: {
					'id': '3'
				}
			};
			dbMock = {
				posts: {
					findAndModify: () => {}
				}
			};
		});
		afterEach(() => {
			mongojsStub.restore();
		});
		it('Rejects when error is returned', (done) => {
			const db = dbActions.__get__('db');			
			dbMock.posts.findAndModify = sinon.stub(dbMock.posts, 'findAndModify');
			dbMock.posts.findAndModify.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.modifyPost(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when no doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findAndModify = sinon.stub(dbMock.posts, 'findAndModify');
			dbMock.posts.findAndModify.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.modifyPost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is length 0', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findAndModify = sinon.stub(dbMock.posts, 'findAndModify');
			dbMock.posts.findAndModify.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.modifyPost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Resolves when doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.findAndModify = sinon.stub(dbMock.posts, 'findAndModify');
			dbMock.posts.findAndModify.callsArgWith(1, null, {'message': 'Finishing this fight'});
			dbActions.__set__({ 'db': dbMock });
			dbActions.modifyPost(req)
			.then((doc) => {
				expect(doc).to.deep.equal({'message': 'Finishing this fight'});
				dbActions.__set__({ 'db': db });
				done();
			})
		});
	});
	describe('Delete Post', () => {
		let req;
		let dbMock;
		let mongojsStub;
		beforeEach(() => {
			mongojsStub = sinon.stub(mongojs, 'ObjectId');
			req = {
				body: {
					'message': 'Hi Spartan117'
				},
				params: {
					'id': '117'
				}
			}
			dbMock = {
				posts: {
					remove: () => {}
				}
			}
		});
		afterEach(() => {
			mongojsStub.restore();
		});
		it('Rejects when error is returned', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.remove = sinon.stub(dbMock.posts, 'remove');
			dbMock.posts.remove.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.deletePost(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when no doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.remove = sinon.stub(dbMock.posts, 'remove');
			dbMock.posts.remove.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.deletePost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is length 0', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.remove = sinon.stub(dbMock.posts, 'remove');
			dbMock.posts.remove.callsArgWith(1, null, []);
			dbActions.__set__({ 'db': dbMock });
			dbActions.deletePost(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Resolves when doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.remove = sinon.stub(dbMock.posts, 'remove');
			dbMock.posts.remove.callsArgWith(1, null, {'message': 'Finishing this fight'});
			dbActions.__set__({ 'db': dbMock });
			dbActions.deletePost(req)
			.then((doc) => {
				expect(doc).to.deep.equal({'message': 'Finishing this fight'});
				dbActions.__set__({ 'db': db });
				done();
			})
		});
	});
	describe('Check User', () => {
		let req;
		let dbMock;
		let mongojsStub;
		beforeEach(() => {
			mongojsStub = sinon.stub(mongojs, 'ObjectId');
			req = {
				body: {
					'message': 'Hi Spartan117'
				},
				params: {
					'id': '117',
					'commentid': '4'
				}
			}
			dbMock = {
				posts: {
					find: () => {}
				}
			}
		});
		afterEach(() => {
			mongojsStub.restore();
		});
		it('Rejects when error is returned', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when no doc is present', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is length 0', (done) => {
			const db = dbActions.__get__('db');
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, []);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.badRequest);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when doc is present and index is beyond limit', (done) => {
			req.user = {};
			req.user.username = 'test1@gmail.com';

			const db = dbActions.__get__('db');
			req.params.commentid = 4;
			const doc = [{
				comments: [{username: 'test1@gmail.com'}],
				username: 'test2@gmail.com'
			}];
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, doc);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.notFound);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when invalid user dealing with post', (done) => {
			req.user = {};
			req.user.username = 'test1@gmail.com';

			const db = dbActions.__get__('db');
			req.params.commentid = null;
			const doc = [{
				message: 'Unyielding',
				username: 'test2@gmail.com'
			}];
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, doc);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.unauthorized);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Rejects when invalid user dealing with others comments', (done) => {
			req.user = {};
			req.user.username = 'test1@gmail.com';

			const db = dbActions.__get__('db');
			req.params.commentid = '023';
			const doc = [{
				comments: [{
					message: 'Other people message',
					id: '023',
					username: 'test2@gmail.com'}]
			}];
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, doc);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.catch((err) => {
				expect(err).to.deep.equal(errorCodes.unauthorized);
				dbActions.__set__({ 'db': db });
				done();
			})
		});
		it('Valid user', (done) => {
			req.user = {};
			req.user.username = 'test1@gmail.com';

			const db = dbActions.__get__('db');
			req.params.commentid = '0';
			const doc = [{
				comments: [{id:'0', username: 'test1@gmail.com'}]
			}];
			dbMock.posts.find = sinon.stub(dbMock.posts, 'find');
			dbMock.posts.find.callsArgWith(1, null, doc);
			dbActions.__set__({ 'db': dbMock });
			dbActions.checkUser(req)
			.then(() => {
				expect(true).to.be.true;
				dbActions.__set__({ 'db': db });
				done();
			})
		});
	});
});
