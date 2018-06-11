package com.teachManage.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ExportExcel {

	/**
	 *
	 * @param request
	 *            生成的excel文件保存路径
	 * @param data
	 *            excel文件内容 List<Map>类型
	 *            。每个map为一行记录，map的key为head中的column用‘，’拆分的结果
	 * @param head
	 *            包括biaoti、header、column
	 *            标题为导出名字、header为excel的标题栏用‘，’隔开、column为date中的key值，用‘，’隔开
	 * @throws Exception
	 */
	public static void export(HttpServletRequest request,HttpServletResponse response,Object data, Map head){
		String biaoti = (String) head.get("biaoti");
		//生成临时文件
		File file=getFile(request,biaoti);
		try {
			//向临时文件中填充数据
			writeExcel( file,data, head);
			//下载文件
			downFile(response, file);
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void writeExcel(File file,Object data, Map head)
			throws Exception {
		// String p = "D:\\test\\aaat.xls"; // 测试设置默认的路径
		List<Map> list = (List<Map>) data;
		String biaoti = (String) head.get("biaoti");
		//获取临时生成的文件

		String[] headers = getHeaders((String) head.get("header"));
		String[] columns = getColumns((String) head.get("column"));
		WritableWorkbook wwb = null;
		try {
			// 首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象
			wwb = Workbook.createWorkbook(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (wwb != null) {
			// 创建一个可写入的工作表
			// Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置
			WritableSheet ws = wwb.createSheet("sheet1", 0);
			ws.setColumnView(1, 20);// 设置第1列宽度，6cm左右
			ws.mergeCells(0, 0, headers.length-1, 1); // 标题合并单元格宽度和合并行数

			WritableFont biaotif = new WritableFont(WritableFont.TIMES, 11,
					WritableFont.BOLD);
			WritableCellFormat biaotifromt = new WritableCellFormat(biaotif);
			biaotifromt.setAlignment(jxl.format.Alignment.CENTRE); // 左右居中
			biaotifromt
					.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 上下居中
			Label label = new Label(0, 0, biaoti, biaotifromt); // 设置标题
			// 赋值标题
			ws.addCell(label);

			// 表头样式
			WritableFont hearderf = new WritableFont(WritableFont.TIMES, 10,
					WritableFont.BOLD);
			WritableCellFormat headerformt = new WritableCellFormat(hearderf);

			// 因为标题合并了2行所以从2 开始
			for (int i = 2; i < (list.size() + 3); i++) {
				Map<String, Object> m = null;
				if (i > 2) {
					m = list.get(i - 3);
				}
				for (int j = 0; j < headers.length; j++) {
					// 这里需要注意的是，在Excel中，第一个参数表示列，第二个表示行

					ws.setColumnView(j, 20); // 设定每列的宽度----
					Label labelC = null;
					if (i == 2) {   //设定表头样式，加粗处理
						// ws.setColumnView(2,80);
						labelC = new Label(j, i, headers[j], headerformt);
					} else {       //设置普通样式，数据填充
						//如果加入表格字段处理接口，则处理完再添加进excel
						if(head.get(columns[j])!=null){
							String colvalue = ((CellParseInterface)(head.get(columns[j]))).parseCell((String)m.get(columns[j]));
							//	String colvalue = getString((CellParseInterface)head.get(columns[j])));
							labelC = new Label(j, i, colvalue);
						}else{
							String colvalue = getString(m.get(columns[j]));
							labelC = new Label(j, i, colvalue);
						}
					}

					try {
						// 将生成的单元格添加到工作表中
						ws.addCell(labelC);
					} catch (RowsExceededException e) {
						e.printStackTrace();
					} catch (WriteException e) {
						e.printStackTrace();
					}

				}
			}

			try {
				// 从内存中写入文件中
				wwb.write();
				// 关闭资源，释放内存
				wwb.close();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (WriteException e) {
				e.printStackTrace();
			}
		}
	}
	public static File getFile(HttpServletRequest request,String str){
		String path = request.getSession().getServletContext().getRealPath("/")+"\\export\\" ;

		String userAgent = request.getHeader("User-Agent");
		try {
			if (userAgent.contains("MSIE")||userAgent.contains("Trident")) {
				str = java.net.URLEncoder.encode(str, "UTF-8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String strfilename = str + "_" + sdf.format(new Date()) + ".xls"; // 重新给文件命名
		File pathf = new File(path);
		File saveDirFile = new File(path + strfilename);
		if (!pathf.exists()) {
			pathf.mkdirs();
		}
		if (!saveDirFile.isFile()) {
			try {
				saveDirFile.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
//		String filepath = saveDirFile.getAbsolutePath();
		return saveDirFile;
	}

	private static void downFile(HttpServletResponse response, File file) {
		try {
			String p =file.toString();
			File f=new File(p);
			String name=f.getName();
			name = new String(name.getBytes("UTF-8"), "ISO-8859-1");
			response.setContentType("application/octet-stream");
			response.setContentType("application/OCTET-STREAM;charset=UTF-8");
			response.setHeader("Content-Disposition", "attachment;filename="
					+ name);
			response.setCharacterEncoding("UTF-8");

			FileInputStream fis = new FileInputStream(file);
			BufferedOutputStream out = new BufferedOutputStream(
					response.getOutputStream());
			byte[] buffer = new byte[(int) file.length() + 10];
			int len;
			while ((len = fis.read(buffer)) != -1) {
				out.write(buffer, 0, len);
				out.flush();
			}
			// 关闭
			out.close();
			fis.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}
	}

//	public static void main(String[] args) {
//
//		try {
//			export1(null,null);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//	}

	private static String[] getHeaders(String a) {
		String as[];
		if (a.indexOf(",") > -1) {
			as = a.split(",");
		} else {
			as = new String[1];
			as[0] = a;
		}
		return as;
	}

	private static String[] getColumns(String a) {
		String as[];
		if (a.indexOf(",") > -1) {
			as = a.split(",");
		} else {
			as = new String[1];
			as[0] = a;
		}
		return as;
	}

	private static String getString(Object t) {
		if (t == null) {
			return "";
		} else {
			return t.toString();
		}
	}
}
