package com.teachManage.util;

import java.util.UUID;

public class UUIDGenerator {

	public synchronized static String uuid(){
		String uuid = UUID.randomUUID().toString();
		return uuid.replaceAll("-", "");
	}
}
