// 统一导入路径
import request, { soap } from '@/utils/request';

let api = {
    getDrugList: '/phis/NsRecoveryExpressService',
};

/**
 * 调用 NsRecoveryExpressService SOAP 服务
 * @param {string} id - 要查询的ID，如 '32702194'
 * @returns {Promise} - 返回解析后的响应数据
 */
export const getDrugListAPI = (id) => {
  // 构造 SOAP XML 请求体
  const soapXml = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:web="http://WebService.phis.xxx.com/">
    <soap:Body>
        <web:queryRecoveryExpressInfo>
            <!-- 这里根据实际的 WSDL 文档调整参数名和结构 -->
            <id>${id}</id>
        </web:queryRecoveryExpressInfo>
    </soap:Body>
</soap:Envelope>`;

  // 设置 SOAP Action
  const soapAction = 'http://WebService.phis.xxx.com/queryRecoveryExpressInfo';

  // 修复：使用正确的 api.getDrugList 而不是 api.phisService
  return soap(api.getDrugList, soapXml, soapAction)
    .then(response => {
      // 解析 SOAP XML 响应
      return parseSoapResponse(response);
    })
    .catch(error => {
      console.error('调用 SOAP 服务失败:', error);
      throw error;
    });
};

/**
 * 解析 SOAP XML 响应
 * @param {string} xmlString - SOAP XML 响应字符串
 * @returns {Object} - 解析后的数据对象
 */
function parseSoapResponse(xmlString) {
  try {
    // 检查是否是 XML 字符串
    if (typeof xmlString === 'string' && xmlString.includes('<?xml')) {
      // 在浏览器环境中，可以使用 DOMParser
      if (typeof window !== 'undefined' && window.DOMParser) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        // 根据实际的 XML 结构提取数据
        // 这是一个示例，需要根据实际的响应结构调整
        const resultNode = xmlDoc.getElementsByTagName('queryRecoveryExpressInfoResponse')[0];
        if (resultNode) {
          // 提取所需的数据
          const data = {
            // 根据实际节点名提取数据
            // 例如: name: resultNode.getElementsByTagName('name')[0]?.textContent || '',
          };
          return data;
        }
      }
      // 如果是在 Node.js 环境或没有 DOMParser，可以使用简单的字符串处理
      // 提取 <queryRecoveryExpressInfoResponse> 标签内的内容
      const startTag = '<queryRecoveryExpressInfoResponse>';
      const endTag = '</queryRecoveryExpressInfoResponse>';
      const startIndex = xmlString.indexOf(startTag);
      const endIndex = xmlString.indexOf(endTag);
      
      if (startIndex !== -1 && endIndex !== -1) {
        const responseContent = xmlString.substring(
          startIndex + startTag.length,
          endIndex
        );
        // 这里可以根据实际需求进一步解析 responseContent
        return { rawData: responseContent };
      }
    } else if (typeof xmlString === 'object') {
      // 如果 response 已经是对象，直接返回
      return xmlString;
    }
    
    // 如果解析失败，返回原始数据
    return { rawResponse: xmlString };
  } catch (error) {
    console.error('解析 SOAP 响应失败:', error);
    return { rawResponse: xmlString, parseError: error.message };
  }
}