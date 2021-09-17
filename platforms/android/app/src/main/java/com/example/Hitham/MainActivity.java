/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.example.Hitham;

import android.os.Bundle;
import org.apache.cordova.*;
import android.Manifest;
import android.app.Activity;
import java.io.File;
import java.lang.Object;
import android.os.Environment;
import android.util.Log;
import android.media.MediaPlayer;
import android.content.pm.PackageManager;
import com.example.Hitham.BuildConfig;








public class MainActivity extends CordovaActivity
{
	
final File folder = new File("/home/you/Desktop");

	
    @Override
    public void onCreate(Bundle savedInstanceState)

    {
		
        super.onCreate(savedInstanceState);
		//setContentView(layout.activity_register);
		
		
		

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
		
		
		 
    	
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
		
		String baseDir = Environment.getExternalStorageDirectory().getAbsolutePath();
		Log.d("VALUE OF X IS ", String.valueOf(baseDir));
		
    }
	
	
	
}


    
	


	
	 
	
	
	
	
		
	




	
