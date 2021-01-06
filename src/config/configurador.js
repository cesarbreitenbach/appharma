import useApi from '../helpers/apiAppharma'
export default  async (  ) => 
{
    const api = useApi()

    const resp = await api.getConf();
    console.log('peguei: '+JSON.stringify(resp))
    const obj = resp

    return obj
}