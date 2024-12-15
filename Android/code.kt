package com.example.testing

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.scale
import androidx.compose.ui.graphics.drawscope.translate
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import kotlinx.coroutines.coroutineScope

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                DrawOnCanvas()
            }
        }
    }
}

@Composable
fun DrawOnCanvas() {
    val rectangles = remember { mutableStateListOf<Offset>() }
    val isMul = remember { mutableStateOf(false) }

    var scale by remember {
        mutableStateOf(1f)
    }
    var offset by remember {
        mutableStateOf(Offset.Zero)
    }

    val state = rememberTransformableState { zoomChange, panChange, rotationChange ->
        if(isMul.value) {
            scale = (scale * zoomChange).coerceIn(1f, 5f)
            offset = Offset(
                x = (offset.x + panChange.x),
                y = (offset.y + panChange.y)
            )
            Log.i("Kelta", "isMul ${isMul.value}")
        }
        else {
            Log.i("Kelta", "isMul ${isMul.value}")
        }
    }

    Box(
        modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            coroutineScope {
                awaitPointerEventScope {
                    while (true) {
                        val event = awaitPointerEvent()
//                        Log.i("Kelta", "Count: ${event.changes.size}")
                        if(event.changes.size == 1) {
                            isMul.value = false
                            val pointer = event.changes.first()
                            if (pointer.pressed) {
                                // Add a rectangle at the tap position
                                rectangles.add(pointer.position)
                                pointer.consume() // Consume the event to avoid further propagation
                            }
                        }
                        else {
                            isMul.value = true
                        }
                    }
                }
            }
        }
    ) {
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .graphicsLayer {
                    scaleX = scale
                    scaleY = scale
                    translationX = offset.x
                    translationY = offset.y
                }
                .transformable(state)
        ) {
            // Draw all the completed paths
            drawCircle(brush = Brush.radialGradient(0.0f to Color. Red, 0.3f to Color. Green, 1.0f to Color.Black), 100f)
            rectangles.forEach { position ->
                drawRect(
                    color = Color.Blue,
                    topLeft = position,
                    size = androidx.compose.ui.geometry.Size(100f, 100f)
                )
            }
        }
    }

}