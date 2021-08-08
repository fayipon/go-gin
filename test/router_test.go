package test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/fayipon/go-gin/router"

	"github.com/stretchr/testify/assert"
)

func TestIHelloGetRouter(t *testing.T) {
	router := router.Setup()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/hello", nil)

	router.ServeHTTP(w, req)

	// 是否 200
	assert.Equal(t, http.StatusOK, w.Code)

	// 是否對應內容
	assert.Equal(t, "Hello, It Home!", w.Body.String())
}
