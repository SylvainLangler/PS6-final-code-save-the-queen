package com.code_save_the_queen.ps6;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class ButtonActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_button);
    }


    public void buttonClick(View view) {
        switch (view.getId()) {
            case R.id.buttonValider:
                Toast.makeText(this, "Button Valider", Toast.LENGTH_SHORT).show();
                break;
            case R.id.buttonIncomplet:
                Toast.makeText(this, "Button Incomplet", Toast.LENGTH_SHORT).show();
                break;
            case R.id.buttonRefuser:
                Toast.makeText(this, "Button Refuser", Toast.LENGTH_SHORT).show();
                break;
            case R.id.buttonRetard:
                Toast.makeText(this, "Button Retard", Toast.LENGTH_SHORT).show();
                break;

        }
    }
}
