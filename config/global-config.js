 let apiUrl
 if (process.env.NODE_ENV === 'development') {
 	// TODOfs
	// apiUrl = "http://192.168.0.173:9112/pgz-api"
	apiUrl = "https://pgz-cctvnp2.shidongvr.com/api/pgz-api" //利长远
 }
 // uEnvProd
 if (process.env.NODE_ENV === 'production') {
 	// TODO sc
	apiUrl = "https://pgz-cctvnp2.shidongvr.com/api/pgz-api"
 }
 
 // export const apiUrl = "http://192.168.0.173:9112/pgz-api" //利长远
 // export const apiUrl = "http://192.168.0.119:9112/pgz-api" //张旭
// export const apiUrl = "https://pgz-cctvnp2.shidongvr.com/api/pgz-api" //线上
export  {apiUrl} 


// 上传图片路径
// export const uploadUrl = `${apiUrl}/common/upload`//线上
export const uploadUrl = `https://pgz-cctvnp2.shidongvr.com/api/pgz-api/common/upload`
// export const uploadUrl = `https://gzzy.shidongvr.com/api/pgz-api/joggleapi/common/upload`


// 图片
export const imgUrl = "https://pgz-cctvnp2.shidongvr.com" //
// export const imgUrl = "http://192.168.0.173:9112" //内网


// export default {
//   baseUrl
// };
