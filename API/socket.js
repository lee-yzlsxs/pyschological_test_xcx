import config from './baseUrl'
export default {
	_bInitEvent: false,
	_bReconnect: false,
	_msgQueue: [],
	_callback: null,
	_tryCount: 0,
	_interval: null,
	_scoket: null,
	_heartCount: 0,
	_connect: false,
	_userInfo: null,
	connet () {
		let status = this._scoket && this._scoket.readyState
		console.log("[socket connect] readyState" + status)
		if (this._scoket && this._socket.readyState === 1) { return }
		this._scoket = uni.connectSocket({
			url: config.socketDomain,
			data: 'data',
			method: 'post',
			header: {
				'content-type': 'application/json'
			},
			success (res) {
				console.log('scoket连接成功', res)
			},
			fail (res) {
				console.log('scoket连接失败', res)
			}
		})
		this._userInfo = uni.getStorageSync('userInfo')
		uni.onSocketOpen(res => {
			console.log('scoket open', JSON.stringify('userInfo'))
			this._connect = true
			// 注册
			this.send({
				type: 'REGISTER',
				userId: this._userInfo.id
			})
			this._send()
			this._heart()
			if (this._bInitEvent) {
				this._onMsg()
			}
			this._tryCount = 0
			if (!this._bInitEvent) {
				this._initEvent()
			}
		})
	},
	_heart () {
		this._interval && clearInterval(this._initEvent)
		this._interval = setInterval(() => {
			let status = this._scoket && this._socket.readyState
			this._heartCount++
			if (status === 1) {
				if (this._heartCount > 20) {
					console.log('[socket.js]发送心跳 readyState', status)
					this.send({
						type: 'HEART'
					})
					this._heartCount = 0
				}
			} else if (status === 3) {
				this._bReconnect = true
				this._socket = {
					readyState: 4
				}
				this.connet()
			}
		}, 500)
	},
	_send () {
		if (!this._connect) { return }
		this._msgQueue.forEach(msg => {
			uni.sendSocketMessage({
				data: JSON.stringify(msg.data),
				success: res => {
					msg.cb && msg.cb(res)
				},
				fail: (err) => {
					console.log(err)
					uni.showToast({
						title: err,
						duration: 2000,
						icon: 'none'
					})
				}
			})
		})
		this._msgQueue = []
	},
	send (msg, cb) {
		this._msgQueue.push({
			data: msg,
			cb
		})
		this._send()
	},
	_initEvent () {
		let that = this
		that._bInitEvent = true
		uni.onSocketMessage(res => {
			that._onMsg(res)
		})
		uni.onSocketClose(res => {
			// this._bReconnect = true
			// that.connet()
			// that._tryCount ++
		})
		uni.onSocketError(err => {
			// this._bReconnect = true
			// that.connet()
			// that._tryCount++
		})
	},
	on (cb) {
		this._callback = cb
	},
	_onMsg (res) {
		this._callback && this._callback(res)
	}
}